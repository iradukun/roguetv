import { Skeleton } from "@/components/ui/skeleton";
import { getStreams } from "@/lib/feed-service";
import { ResultCard, ResultCardSkeleton } from "./result-card";

export const Results = async () => {
  const data = await getStreams();
  return (
    <div className="">
      <h2 className="text-lg font-semibold mb-4">
        Streams, We think you&apos;ll like...
      </h2>
      {data.length === 0 && (
        <div className="text-muted-foreground text-sm">No Steams found!</div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
        {data.map((result: any) => (
          <ResultCard key={result.id} data={result} />
        ))}
      </div>
    </div>
  );
};

export const ResultsSkeleton = () => {
  return (
    <div>
      <Skeleton className="h-8 w-[290px] mb-4" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
        {[...Array(4).map((_, i) => <ResultCardSkeleton key={i} />)]}
      </div>
    </div>
  );
};
