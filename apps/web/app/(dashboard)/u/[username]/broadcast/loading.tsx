import { Skeleton } from "@/components/ui/skeleton";
import { BroadcastCardSkeleton } from "./_components/broadcast-card";

export default function ChatLoading() {
  return (
    <div className="p-6 space-y-4">
      <Skeleton className="h-10 w-[200px]" />
      <div className="grid grid-cols-4">
        <BroadcastCardSkeleton />
      </div>
    </div>
  );
}
