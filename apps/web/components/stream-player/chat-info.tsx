import { useMemo } from "react";
import { Info } from "lucide-react";
import { Hint } from "../hint";

interface ChatInfoProps {
  isDelayed: boolean;
  isFollowersOnly: boolean;
  isSubscribersOnly: boolean;
}

export const ChatInfo = ({ isDelayed, isFollowersOnly, isSubscribersOnly }: ChatInfoProps) => {
  const hint = useMemo(() => {
    if (isFollowersOnly && !isDelayed) {
      return "Only Followers can chat!";
    } else if (isDelayed && !isFollowersOnly) {
      return "Messages are delayed by 3 seconds!";
    } else if (isDelayed && isFollowersOnly) {
      return "Only Followers can chat & Messages are delayed by 3 seconds!";
    } else if (isSubscribersOnly && !isDelayed) {
      return "Only Subscribers can chat!";
    } else if (isDelayed && !isSubscribersOnly) {
      return "Messages are delayed by 3 seconds!";
    } else if (isDelayed && isSubscribersOnly) {
      return "Only Subscribers can chat & Messages are delayed by 3 seconds!";
    }
    return "";
  }, [isDelayed, isFollowersOnly, isSubscribersOnly]);

  const label = useMemo(() => {
    if (isFollowersOnly && !isDelayed) {
      return "Followers Only!";
    } else if (isDelayed && !isFollowersOnly) {
      return "Slow Mode!";
    } else if (isDelayed && isFollowersOnly) {
      return "Followers Only & Slow Mode!";
    } else if (isSubscribersOnly && !isDelayed) {
      return "Subscribers Only!";
    } else if (isDelayed && !isSubscribersOnly) {
      return "Slow Mode!";
    } else if (isDelayed && isSubscribersOnly) {
      return "Subscribers Only & Slow Mode!";
    }

    return "";
  }, [isDelayed, isFollowersOnly, isSubscribersOnly]);

  if (!isDelayed && !isFollowersOnly && !isSubscribersOnly) {
    return null;
  }

  return (
    <div className="p-2 text-muted-foreground bg-white/5 border border-white/10 w-full rounded-t-md flex items-center gap-x-2">
      <Hint side="left" label={hint}>
        <Info className="h-4 w-4 text-sky-400" />
      </Hint>
      <p className="text-xs font-semibold">{label}</p>
    </div>
  );
};
