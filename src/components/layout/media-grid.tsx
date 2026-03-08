import { MediaCardSkeleton } from "@/components/layout/media-card";
import { RESULTS_PER_PAGE } from "@/utils/constants";
import { ComponentProps } from "react";

export function MediaGrid({ children }: ComponentProps<"div">) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {children}
    </div>
  );
}

export function MediaGridSkeleton() {
  return (
    <MediaGrid>
      {Array.from({ length: RESULTS_PER_PAGE }).map((_, index) => (
        <MediaCardSkeleton key={index} />
      ))}
    </MediaGrid>
  );
}
