"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CheckoutPage from "./checkout";

export function CheckoutForm({ disabled }: { disabled: boolean }) {
  return (
    <Dialog>
      <DialogTrigger asChild disabled={disabled}>
        <Button disabled={disabled} variant={"primary"} size={"sm"}>
          subscribe
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[455px]">
        <DialogHeader>
          <DialogTitle>Subscribe</DialogTitle>
          <DialogDescription>
            subscribe to user to get benefits. <b className="text-lg font-bold">$2.99/mon</b>
          </DialogDescription>
        </DialogHeader>
        <div className="p-2 mt-2">
          <CheckoutPage />
        </div>
      </DialogContent>
    </Dialog>
  );
}
