import { StreamPlayer } from "@/components/stream-player";
import { currentUser } from "@/lib/auth-service";
import { getUserByUsername } from "@/lib/user-service";


interface DashboarPageProps {
  params: {
    username: string;
  };
}

export default async function DashboardPage({ params }: DashboarPageProps) {
  const externalUser = await currentUser();
  const user = await getUserByUsername(params.username);

  // if (!user || user.id !== externalUser?.id || !user.stream) {
  //   throw new Error(`Unauthorized!`);
  // }

  return (
    <div className="h-full">
      <StreamPlayer user={user} stream={user.stream} isFollowing isSubscribed={false} />
    </div>
  );
}
