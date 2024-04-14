import { Skeleton } from "@/components/ui/skeleton";
import { formatDistanceToNow } from "date-fns";

interface BroadcastCardProps {
  url: string;
  createdAt: string;
}
export const BroadcastCard = ({ createdAt, url }: BroadcastCardProps) => {
  return (
    <div className="h-[13rem] w-[22rem] rounded-lg shadow-md">
      <video className="h-full w-full rounded-lg" controls>
        <source src={url} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="w-full p-2">
        <p className="text-sm text-muted-foreground">
          {formatDistanceToNow(new Date(createdAt), {
            addSuffix: true,
          })}
        </p>
      </div>
    </div>
  );
};

export const BroadcastCardSkeleton = () => {
  return <Skeleton className="rounded-lg h-[13rem] w-[22rem]" />;
};
