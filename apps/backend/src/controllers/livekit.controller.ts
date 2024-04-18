import { Request, Response } from "express";
import {
  EgressClient,
  RoomServiceClient,
  WebhookReceiver,
} from "livekit-server-sdk";
import { TrackSource } from "livekit-server-sdk/dist/proto/livekit_models";
import { db } from "../lib/db";
import { Broadcast } from "../models/broadcast.model";
import { Stream } from "../models/stream.model";
import { generateRandomString } from "../utils/utils";

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
      const stream = await Stream.findOne({
        ingressId: event.ingressInfo?.ingressId,
        isLive: false,
      });
      if (stream) {
        const { tracks } = await roomService.getParticipant(
          stream?.userId?.id.toString() ?? "",
          stream?.userId?.id.toString() ?? ""
        );
        console.log("[DEBUG]: 1");
        if (tracks.length > 0) {
          const audioTrackId = tracks.find(
            (track) => track.source === TrackSource.MICROPHONE
          )?.sid;
          const videoTrackId = tracks.find(
            (track) => track.source === TrackSource.CAMERA
          )?.sid;
          console.log("[DEBUG]: 2");
          const broadcast_id = generateRandomString(32);
          console.log("[DEBUG]: 3");
          const egress = await egressClient.startTrackCompositeEgress(
            stream?.userId?.id.toString() ?? "",
            {
              s3: {
                accessKey: process.env.S3_ACCESS_KEY!,
                secret: process.env.S3_SECRET_KEY!,
                region: process.env.S3_REGION!,
                bucket: process.env.S3_BUCKET!,
                endpoint: process.env.S3_ENDPOINT!,
              },
              filepath: `broadcast-${broadcast_id}.mp4`,
            },
            audioTrackId,
            videoTrackId
          );
          console.log("[DEBUG]: 4");
          await Broadcast.create({
            userId: stream.userId,
            streamId: stream.id,
            url: `https://${process.env.S3_BUCKET}.${process.env.S3_ENDPOINT}/broadcast-${broadcast_id}.mp4`,
          });

          console.log("[DEBUG]: 5");
          console.log("[EGRESS] created", egress.fileResults);
          await Stream.findOneAndUpdate(
            { ingressId: event.ingressInfo?.ingressId },
            { isLive: true }
          );
          console.log("[DEBUG]: 6");
        }
      }
    }

    if (event.event === "ingress_ended") {
      const stream = await db.stream.update({
        where: { ingressId: event.ingressInfo?.ingressId },
        data: {
          isLive: false,
        },
      });
      const broadcast = await db.broadcast.findFirst({
        where: {
          isComplete: false,
          streamId: stream.id,
        },
      });
      if (broadcast) {
        await db.broadcast.update({
          where: {
            id: broadcast.id,
          },
          data: {
            isComplete: true,
          },
        });
      }
    }

    return res.status(200).send("Stream Status Updated!");
  } catch (error) {
    console.error(`[LiveKit WEBHOOK ERROR]: ${error}`);
    return res.status(500).send("LiveKit WebHook Error!");
  }
}
