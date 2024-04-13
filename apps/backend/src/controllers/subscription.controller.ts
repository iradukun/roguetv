import { Request, Response } from "express";
import Stripe from "stripe";
import ApiError from "../errors/ApiError";
import {
  createSubscription,
  isSubscribedUser,
  updatedSubscription,
} from "../services/subscription-service";

export const createSubscriptionController = async (
  req: Request,
  res: Response
) => {
  try {
    const data = await createSubscription(req.body.username, req.body.userId);
    res.status(200).json(data);
  } catch (error: any) {
    if (error instanceof ApiError) {
      res.status(error.status ?? 500).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export const subscriptionWebhook = async (req: Request, res: Response) => {
  const sig = req.headers["stripe-signature"] as string;

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.error("Webhook Error:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case "customer.subscription.created":
      const metadata = event.data.object.metadata;
      await updatedSubscription(metadata.id, true);
      break;
    case "customer.subscription.updated":
      // TODO: Handle subscription updated event
      break;
    case "customer.subscription.deleted":
      // TODO: Handle subscription deleted event
      break;
    default:
      return res.status(400).end();
  }

  // Return a response to acknowledge receipt of the event
  res.json({ received: true });
};

export const checkUserSubscribesController = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = req.params.userId;
    const id = req.params.id;
    const isSubscribed = await isSubscribedUser(id, userId);
    res.status(200).json({ value: isSubscribed });
  } catch (error: any) {
    if (error instanceof ApiError) {
      res.status(error.status ?? 500).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};
