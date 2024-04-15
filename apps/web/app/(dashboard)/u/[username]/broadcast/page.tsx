import { getBroadcasts } from "@/lib/broadcast-service";
import { BroadcastCard } from "./_components/broadcast-card";

interface BroadcastPageProps {
  params: { username: string };
}

interface Broadcast {
  url: string;
  createdAt: string;
  id: string;
}

export default async function BroadcastPage({ params }: BroadcastPageProps) {
  const broadcasts = await getBroadcasts() as Broadcast[];

  return (
    <div className="p-6 w-full">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Past broadcasts</h1>
      </div>
      <div className="grid grid-cols-3 w-full gap-8">
        {broadcasts.map((broadcast) => (<BroadcastCard key={broadcast.id} {...broadcast} />))}
      </div>
    </div>
  );
}
