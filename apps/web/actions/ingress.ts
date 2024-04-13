"use server";

import {
  EgressClient,
  IngressAudioEncodingPreset,
  IngressClient,
  IngressInput,
  IngressVideoEncodingPreset,
  RoomServiceClient,
  type CreateIngressOptions,
} from "livekit-server-sdk";
import { TrackSource } from "livekit-server-sdk/dist/proto/livekit_models";

import { getSelf } from "@/lib/auth-service";
import { updateStreamByUserId } from "@/lib/stream-service";
import { revalidatePath } from "next/cache";

const roomService = new RoomServiceClient(
  process.env.LIVEKIT_API_URL!,
  process.env.LIVEKIT_API_KEY!,
  process.env.LIVEKIT_SECRET_KEY!
);

const ingressClient = new IngressClient(
  process.env.LIVEKIT_API_URL!,
  process.env.LIVEKIT_API_KEY!,
  process.env.LIVEKIT_SECRET_KEY!
);

const egressClient = new EgressClient(
  process.env.LIVEKIT_API_URL!,
  process.env.LIVEKIT_API_KEY!,
  process.env.LIVEKIT_SECRET_KEY!
);

const roomServiceClient = new RoomServiceClient(
  process.env.LIVEKIT_API_URL!,
  process.env.LIVEKIT_API_KEY!,
  process.env.LIVEKIT_SECRET_KEY!
);

export const resetIngresses = async (hostIdentity: string) => {
  const ingresses = await ingressClient.listIngress({
    roomName: hostIdentity,
  });

  const rooms = await roomService.listRooms([hostIdentity]);

  for (const room of rooms) {
    await roomService.deleteRoom(room.name);
  }

  for (const ingress of ingresses) {
    if (ingress.ingressId) {
      await ingressClient.deleteIngress(ingress.ingressId);
    }
  }
};

export const createIngress = async (ingressType: IngressInput) => {
  try {
    const self = await getSelf();
    console.log("[number 1]");
    // Reset Previous Ingress
    await resetIngresses(self?.id ?? "");
    console.log("[number 2]");

    const options: CreateIngressOptions = {
      name: self?.username,
      roomName: self?.id,
      participantName: self?.name ?? "",
      participantIdentity: self?.id,
    };
    console.log("[number 3]");

    if (ingressType === IngressInput.WHIP_INPUT) {
      options.bypassTranscoding = true;
    } else {
      options.video = {
        source: TrackSource.CAMERA,
        preset: IngressVideoEncodingPreset.H264_1080P_30FPS_3_LAYERS,
      };
      options.audio = {
        source: TrackSource.MICROPHONE,
        preset: IngressAudioEncodingPreset.OPUS_STEREO_96KBPS,
      };
    }
    console.log("[number 4]");

    const ingress = await ingressClient.createIngress(ingressType, options);

    console.log("[number 5]");
    if (!ingress || !ingress.url || !ingress.streamKey) {
      throw new Error(`Failed to create ingress!`);
    }
    console.log("[number 6]");

    await updateStreamByUserId(
      {
        ingressId: ingress.ingressId,
        serverUrl: ingress.url,
        streamKey: ingress.streamKey,
      },
      self?.id ?? ""
    );
    console.log("[number 7]");
    const { tracks } = await roomServiceClient.getParticipant(
      self?.id ?? "",
      self?.id ?? ""
    );
    console.log("[number 8]");
    const audioTrackId = tracks.find(
      (track) => track.source === TrackSource.MICROPHONE
    )?.sid;
    const videoTrackId = tracks.find(
      (track) => track.source === TrackSource.CAMERA
    )?.sid;

    console.log("[number 9]");
    const egress = await egressClient.startTrackCompositeEgress(
      self?.id ?? "",
      {
        s3: {
          accessKey: "005194de6a878530000000007",
          secret: "K005yERiKVKhzd8Xn47HECAJEahQnMA",
          region: "us-east-005",
          bucket: "livekit",
          endpoint: "s3.us-east-005.backblazeb2.com",
        },
        filepath: `livekit-demo/room-composite-test-${self?.id}.mp4`,
      },
      audioTrackId,
      videoTrackId
    );
    console.log("[EGRESS]", egress);
    console.log("[number 10]");
    revalidatePath(`/u/${self?.username}/keys`);
    return ingress;
  } catch (error: any) {
    console.error(`[createIngress ERROR]: ${error}`);
    return error;
  }
};
