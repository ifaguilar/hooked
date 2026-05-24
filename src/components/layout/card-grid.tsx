import { ComponentProps } from "react";

import { Card, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { RESULTS_PER_PAGE } from "@/utils/constants";

export function CardGrid({ children }: ComponentProps<"div">) {
  return <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5">{children}</div>;
}

export function CardSkeleton() {
  return (
    <Card className="h-full overflow-hidden pt-0">
      <Skeleton className="aspect-2/3 w-full" />
      <CardHeader>
        <Skeleton className="mb-2 h-4 w-3/4" />
        <Skeleton className="h-3 w-1/4" />
      </CardHeader>
    </Card>
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
