import { isFollowingUser } from "@/lib/follow-service";
import { getUserByUsername } from "@/lib/user-service";
import { notFound } from "next/navigation";
import { isBlockedByUser } from "@/lib/block-service";
import { StreamPlayer } from "@/components/stream-player";
import { isSubcribedUser } from "@/lib/subscription-service";

interface UserPageProps {
  params: {
    username: string;
  };
}

export default async function UserPage({ params }: UserPageProps) {
  const user = await getUserByUsername(params.username);

  if (!user || !user.stream) {
    notFound();
  }

  const isFollowing = await isFollowingUser(user.id);

  const isSubscribed = await isSubcribedUser(user.id);

  const isBlocked = await isBlockedByUser(user.id);


  if (isBlocked) {
    notFound();
  }

  return (
    <StreamPlayer user={user} stream={user.stream} isFollowing={isFollowing} isSubscribed={isSubscribed} />
  );
}
