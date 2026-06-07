import { Card, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

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
