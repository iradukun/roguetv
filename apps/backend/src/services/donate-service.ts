import Stripe from "stripe";
require("dotenv").config();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export const createDonation = async (amount: number) => {
  return await stripe.paymentIntents.create({
    amount,
    currency: "usd",
    customer: "cus_Pt0LVVF40HUl4g",
    automatic_payment_methods: { enabled: true, allow_redirects: "never" },
  });
};
