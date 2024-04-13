"use client";

import { onFollow, onUnfollow } from "@/actions/follow";
import { cn } from "@/lib/utils";
import { Heart } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import { CheckoutForm } from "../checkout-form";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";

interface ActionsProps {
  hostIdentity: string;
  isHost: boolean;
  isFollowing: boolean;
  isSubscribed: boolean;
}

export const Actions = ({
  hostIdentity,
  isHost,
  isFollowing,
  isSubscribed,
}: ActionsProps) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { data } = useSession();

  const handleFollow = () => {
    startTransition(() => {
      onFollow(hostIdentity)
        .then((data) =>
          toast.success(`You are now following: ${data.following.name}!`)
        )
        .catch((error) =>
          toast.error(error.message || "Something went wrong!")
        );
    });
  };

  const handleUnfollow = () => {
    startTransition(() => {
      onUnfollow(hostIdentity)
        .then((data) =>
          toast.success(`You have unfollowed: ${data.following.name}!`)
        )
        .catch((error) =>
          toast.error(error.message || "Something went wrong!")
        );
    });
  };

  const toggleFollow = () => {
    if (!data?.user.id) {
      return router.push("/");
    }

    if (isHost) return;

    if (isFollowing) {
      handleUnfollow();
    } else {
      handleFollow();
    }
  };

  return (
    <div className="flex justify-center items-center gap-2">
      <Button
        onClick={toggleFollow}
        disabled={isPending || isHost}
        variant={"primary"}
        size={"sm"}
        className="w-full lg:w-auto"
      >
        <Heart
          className={cn(
            "h-4 w-4 mr-2",
            isFollowing ? "fill-white" : "fill-rose-600"
          )}
        />
        {isFollowing ? "Unfollow" : "Follow"}
      </Button>
      {isSubscribed ? (
        <Button disabled variant={"primary"} size={"sm"}>
          subscribed
        </Button>
      ) : (
        <CheckoutForm disabled={isHost} />
      )}
    </div>
  );
};

export const ActionsSkeleton = () => {
  return <Skeleton className="h-10 w-full lg:w-24" />;
};
