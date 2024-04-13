import { Request, Response } from "express";
import {
  EgressClient,
  RoomServiceClient,
  WebhookReceiver,
} from "livekit-server-sdk";
import { TrackSource } from "livekit-server-sdk/dist/proto/livekit_models";
import { db } from "../lib/db";

const receiver = new WebhookReceiver(
  process.env.LIVEKIT_API_KEY!,
  process.env.LIVEKIT_SECRET_KEY!
);
const roomService = new RoomServiceClient(
  process.env.LIVEKIT_API_URL!,
  process.env.LIVEKIT_API_KEY!,
  process.env.LIVEKIT_SECRET_KEY!
);

const egressClient = new EgressClient(
  process.env.LIVEKIT_API_URL!,
  process.env.LIVEKIT_API_KEY!,
  process.env.LIVEKIT_SECRET_KEY!
);
export async function livekitWebhook(req: Request, res: Response) {
  try {
    const body = req.body;
    const headerPayload = req.headers;
    const authorization = headerPayload.authorization;

    if (!authorization) {
      return res.status(400).send("No authorization Header");
    }

    const event = receiver.receive(body, authorization);

    if (event.event === "ingress_started") {
      const stream = await db.stream.findFirst({
        where: { ingressId: event.ingressInfo?.ingressId, isLive: false },
      });
      if (stream) {
        const { tracks } = await roomService.getParticipant(
          stream.userId,
          stream.userId
        );
        const audioTrackId = tracks.find(
          (track) => track.source === TrackSource.MICROPHONE
        )?.sid;
        const videoTrackId = tracks.find(
          (track) => track.source === TrackSource.CAMERA
        )?.sid;

        const egress = await egressClient.startTrackCompositeEgress(
          stream.userId,
          {
            s3: {
              accessKey: "005194de6a878530000000007",
              secret: "K005yERiKVKhzd8Xn47HECAJEahQnMA",
              region: "us-east-005",
              bucket: "livekit",
              endpoint: "s3.us-east-005.backblazeb2.com",
            },
            filepath: `room-composite-test-${stream.userId}.mp4`,
          },
          audioTrackId,
          videoTrackId
        );
        console.log("[EGRESS] created");
        await db.stream.update({
          where: { ingressId: event.ingressInfo?.ingressId },
          data: {
            isLive: true,
          },
        });
      }
    }

    if (event.event === "ingress_ended") {
      await db.stream.update({
        where: { ingressId: event.ingressInfo?.ingressId },
        data: {
          isLive: false,
        },
      });
    }

    return res.status(200).send("Stream Status Updated!");
  } catch (error) {
    console.error(`[LiveKit WEBHOOK ERROR]: ${error}`);
    return res.status(500).send("LiveKit WebHook Error!");
  }
}
