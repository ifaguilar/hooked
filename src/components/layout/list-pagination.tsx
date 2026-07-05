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
import { FIRST_PAGE, MAX_PAGES } from "@/utils/constants";

interface ListPaginationProps {
  currentPage: number;
  totalPages: number;
  from: FileRouteTypes["fullPaths"];
}

function isEllipsis(item: number | string): item is "ellipsis" {
  return item === "ellipsis";
}

function getPaginationItems(currentPage: number, maxPages: number) {
  if (maxPages <= 7) {
    return Array.from({ length: maxPages }).map((_, index) => index + 1);
  }

  if (currentPage <= 4) {
    return [FIRST_PAGE, 2, 3, 4, 5, "ellipsis", maxPages];
  }

  if (currentPage >= maxPages - 3) {
    return [
      FIRST_PAGE,
      "ellipsis",
      maxPages - 4,
      maxPages - 3,
      maxPages - 2,
      maxPages - 1,
      maxPages,
    ];
  }

  return [
    FIRST_PAGE,
    "ellipsis",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "ellipsis",
    maxPages,
  ];
}

export function ListPagination({
  currentPage,
  totalPages,
  from,
}: ListPaginationProps) {
  const maxPages = Math.min(totalPages, MAX_PAGES);
  const items = getPaginationItems(currentPage, maxPages);

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            from={from}
            to="."
            search={(prev) => ({
              ...prev,
              page: Math.max(FIRST_PAGE, currentPage - 1),
            })}
            aria-disabled={currentPage <= FIRST_PAGE}
            disabled={currentPage <= FIRST_PAGE}
            className={
              currentPage <= FIRST_PAGE ? "pointer-events-none opacity-50" : ""
            }
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
