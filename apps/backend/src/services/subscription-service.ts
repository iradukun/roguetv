import { Stripe } from "stripe";
import ApiError from "../errors/ApiError";
import { Subscription } from "../models/subscription.model";
import { User } from "../models/user.model";
require("dotenv").config();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export const createSubscriptionSession = async (
  userId: string,
  username: string
) => {
  try {
    const subscriptionData = await createSubscription(username, userId);
    const subscription = await stripe.subscriptions.create({
      customer: "cus_Pt0LVVF40HUl4g",
      collection_method: "charge_automatically",
      items: [{ price: "price_1P50otLZvTUR5WIHEpjO23Eh" }],
      metadata: {
        id: subscriptionData.id,
      },
      payment_behavior: "default_incomplete",
      payment_settings: {
        payment_method_types: ["card"],
        save_default_payment_method: "on_subscription",
      },
      expand: ["latest_invoice.payment_intent"],
    });
    if (subscription.latest_invoice) {
      //@ts-ignore
      const latest_invoice = subscription.latest_invoice.id;

      const invoice = await stripe.invoices.retrieve(latest_invoice, {
        expand: ["payment_intent"],
      });

      const payment_intent = invoice.payment_intent;
      return payment_intent;
    } else {
      throw new Error("Error: Invalid invoice");
    }
  } catch (error: any) {
    throw new ApiError(error.message, 500);
  }
};

export const isSubscribedUser = async (id: string, userId: string) => {
  try {
    const otherUser = await User.findById(id);
    if (!otherUser) {
      throw new ApiError("User not found!", 404);
    }

    if (otherUser.id === userId) {
      return true;
    }

    const existingSubscription = await Subscription.findOne({
      subscriptionId: otherUser.id,
      subscriptionById: userId,
      isActive: true,
    });
    return !!existingSubscription;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const createSubscription = async (username: string, userId: string) => {
  try {
    const otherUser = await User.findOne({ username });
    if (!otherUser) {
      throw new ApiError("User not found!", 404);
    }

    if (otherUser.id === userId) {
      throw new ApiError("Cannot subscribe yourself!", 400);
    }

    const existingSubscribe = await Subscription.findOne({
      subscriptionId: otherUser.id,
      subscriptionById: userId,
    });

    if (existingSubscribe) {
      throw new ApiError("Already subscribing to this user!", 400);
    }

    const subscription = await Subscription.create({
      subscriptionId: otherUser.id,
      subscriptionById: userId,
    });
    const subscriptioning = await User.findById(otherUser.id);
    const subscribedBy = await User.findById(userId);
    return { ...subscription, subscriptioning, subscribedBy };
  } catch (error) {
    throw error;
  }
};

export const updatedSubscription = async (
  id: string,
  isSubscribed: boolean
) => {
  try {
    await Subscription.findByIdAndUpdate(id, { isActive: isSubscribed });
  } catch (error) {
    console.error(error);
    throw error;
  }
};
