import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import type { FileRouteTypes } from "@/routeTree.gen";

interface MediaPaginationProps {
  currentPage: number;
  totalPages: number;
  from: FileRouteTypes["fullPaths"];
}

function isEllipsis(item: number | string): item is "ellipsis" {
  return item === "ellipsis";
}

function getPaginationItems(currentPage: number, totalPages: number) {
  const maxPages = Math.min(totalPages, 500);

  if (maxPages <= 7) {
    return Array.from({ length: maxPages }).map((_, i) => i + 1);
  }

  if (currentPage <= 4) {
    return [1, 2, 3, 4, 5, "ellipsis", maxPages];
  }

  if (currentPage >= maxPages - 3) {
    return [
      1,
      "ellipsis",
      maxPages - 4,
      maxPages - 3,
      maxPages - 2,
      maxPages - 1,
      maxPages,
    ];
  }

  return [
    1,
    "ellipsis",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "ellipsis",
    maxPages,
  ];
}

export function MediaPagination({
  currentPage,
  totalPages,
  from,
}: MediaPaginationProps) {
  const maxPages = Math.min(totalPages, 500);
  const items = getPaginationItems(currentPage, totalPages);

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            from={from}
            to="."
            search={(prev) => ({
              ...prev,
              page: Math.max(1, currentPage - 1),
            })}
            aria-disabled={currentPage <= 1}
            disabled={currentPage <= 1}
            className={currentPage <= 1 ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>

        {items.map((item, index) => (
          <PaginationItem key={index}>
            {isEllipsis(item) ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                from={from}
                to="."
                search={(prev) => ({
                  ...prev,
                  page: item as number,
                })}
                isActive={currentPage === item}
              >
                {item}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            from={from}
            to="."
            search={(prev) => ({
              ...prev,
              page: Math.min(maxPages, currentPage + 1),
            })}
            aria-disabled={currentPage >= maxPages}
            disabled={currentPage >= maxPages}
            className={
              currentPage >= maxPages ? "pointer-events-none opacity-50" : ""
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
