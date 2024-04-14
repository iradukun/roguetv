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
import { useState } from "react";
import DonatePage from "./donate";
import { useDonateListener } from "@/hooks/use-donate";

export function DonateForm({ disabled }: { disabled: boolean }) {
  const [open, setOpen] = useState(false);
  useDonateListener(() => {
    setOpen(false);
  });
  return (
    <Dialog open={open} onOpenChange={(state) => setOpen(state)}>
      <DialogTrigger asChild disabled={disabled}>
        <Button variant={"primary"} size={"sm"} disabled={disabled}>
          Donate
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[455px]">
        <DialogHeader>
          <DialogTitle>Donate</DialogTitle>
          <DialogDescription>
            donate to support streamer. <b className="text-lg font-bold">$1</b>
          </DialogDescription>
        </DialogHeader>
        <div className="p-2 mt-2">
          <DonatePage />
        </div>
      </DialogContent>
    </Dialog>
  );
}
