import type { ComponentProps } from "react";

import { CardSkeleton } from "@/components/layout/card-skeleton";
import { RESULTS_PER_PAGE } from "@/config/constants";

export function CardGrid({ children }: ComponentProps<"div">) {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5">
      {children}
    </div>
  );
}

export function CardGridSkeleton() {
  return (
    <CardGrid>
      {Array.from({ length: RESULTS_PER_PAGE }).map((_, index) => (
        <CardSkeleton key={index} />
      ))}
    </CardGrid>
  );
}
