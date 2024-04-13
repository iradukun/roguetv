import { WebhookReceiver } from 'livekit-server-sdk';

import { db } from '../lib/db';
import { Request, Response } from 'express';

const receiver = new WebhookReceiver(
  process.env.LIVEKIT_API_KEY!,
  process.env.LIVEKIT_SECRET_KEY!,
);

export async function livekitWebhook(req: Request, res: Response) {
  try {
    const body = req.body;
    const headerPayload = req.headers;
    const authorization = headerPayload.authorization;

    if (!authorization) {
      return res.status(400).send('No authorization Header');
    }

    const event = receiver.receive(body, authorization);

    if (event.event === 'ingress_started') {
      await db.stream.update({
        where: { ingressId: event.ingressInfo?.ingressId },
        data: {
          isLive: true,
        },
      });
    }

    if (event.event === 'ingress_ended') {
      await db.stream.update({
        where: { ingressId: event.ingressInfo?.ingressId },
        data: {
          isLive: false,
        },
      });
    }

    return res.status(200).send('Stream Status Updated!');
  } catch (error) {
    console.error(`[LiveKit WEBHOOK ERROR]: ${error}`);
    return res.status(500).send('LiveKit WebHook Error!');
  }
}
