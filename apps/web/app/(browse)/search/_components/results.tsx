import { getSearch } from "@/lib/search-service";
import { ResultCard, ResultCardSkeleton } from "./result-card";
import { Skeleton } from "@/components/ui/skeleton";

interface ResultsProps {
  term?: string;
}

export const Results = async ({ term }: ResultsProps) => {
  const data = await getSearch(term);

  return (
    <div className="text-lg font-semibold mb-4 ">
      <h2 className="text-lg font-semibold mb-4">
        Results for term &quot;{term}&quot;{" "}
      </h2>
      {data.length === 0 && (
        <p className="text-muted-foreground text-sm">
          No Results found, Try searching for something else
        </p>
      )}
      <div className="flex flex-col gap-y-4 ">
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
      <div className="flex flex-col gap-y-4">
        {[...Array(4)].map((_, i) => (
          <ResultCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
};
