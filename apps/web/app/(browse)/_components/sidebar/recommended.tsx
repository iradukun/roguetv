"use client";

import { useSidebar } from "@/store/use-sidebar";
import { UserItem, UserItemSkeleton } from "./user-item";

interface RecommendedProps {
  data: (any & {
    stream: { isLive: boolean } | null;
  })[];
}

export const Recommended = ({ data }: RecommendedProps) => {
  const { isExpanded } = useSidebar((state) => state);
  const showLabel = isExpanded && data.length > 0;

  return (
    <div>
      {showLabel && (
        <div className="pl-6 mb-3">
          <p className="text-sm text-muted-foreground">Recommended</p>
        </div>
      )}
      <ul className="space-y-2 px-2">
        {data.map((user) => (
          <UserItem
            key={user.id}
            username={user.username}
            imageUrl={user.imageUrl}
            isLive={user.stream?.isLive}
          />
        ))}
      </ul>
    </div>
  );
};

export const RecommendedSkeleton = () => {
  return (
    <ul className="px-2">
      {[...Array(3)].map((_, i) => (
        <UserItemSkeleton key={i} />
      ))}
    </ul>
  );
};
