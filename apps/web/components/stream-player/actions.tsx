"use client";

import { onFollow, onUnfollow } from "@/actions/follow";
import { cn } from "@/lib/utils";
import { Heart } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";

interface ActionsProps {
  hostIdentity: string;
  isHost: boolean;
  isFollowing: boolean;
}

export const Actions = ({
  hostIdentity,
  isHost,
  isFollowing,
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
      return router.push("/sign-in");
    }

    if (isHost) return;

    if (isFollowing) {
      handleUnfollow();
    } else {
      handleFollow();
    }
  };

  return (
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
  );
};

export const ActionsSkeleton = () => {
  return <Skeleton className="h-10 w-full lg:w-24" />;
};
