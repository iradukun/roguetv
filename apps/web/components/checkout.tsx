"use client";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import { createSubscription } from "@/lib/subscription-service";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "./ui/button";
export default function CheckoutPage() {
  const stripeApiKey = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
  );
  return (
    <Elements stripe={stripeApiKey}>
      <Checkout />
    </Elements>
  );
}

export function Checkout() {
  const stripe = useStripe();
  const router = useRouter();
  const elements = useElements();
  const { username } = useParams<{ username: string }>();
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const cardElement = elements?.getElement("card");

    try {
      if (!stripe || !cardElement) return null;
      const client_secret = await createSubscription(username);

      await stripe?.confirmCardPayment(client_secret, {
        payment_method: { card: cardElement },
      });
      toast.success("Payment successful");
      router.refresh();
    } catch (error) {
      toast.error("Error occurred");
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <CardElement />
      <Button type="submit" className="mt-4">
        Submit
      </Button>
    </form>
  );
}
