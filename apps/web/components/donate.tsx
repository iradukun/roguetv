"use client";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import { emitDonate } from "@/hooks/use-donate";
import { createDonation } from "@/lib/donate-service";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { toast } from "sonner";
import { Button } from "./ui/button";
export default function DonatePage() {
  const stripeApiKey = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
  );
  return (
    <Elements stripe={stripeApiKey}>
      <Donate />
    </Elements>
  );
}

export function Donate() {
  const stripe = useStripe();
  const elements = useElements();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const cardElement = elements?.getElement("card");

    try {
      if (!stripe || !cardElement) return null;

      const response = await createDonation(
        1 * 100, // Amount in cents
      );

      await stripe?.confirmCardPayment(response, {
        payment_method: { card: cardElement },
      });
      toast.success("Payment successful");
      emitDonate();
    } catch (error: any) {
      console.log(error.message);
      toast.error("Error occurred");
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <CardElement />
      <Button type="submit" className="mt-4">
        Proceed
      </Button>
    </form>
  );
}
