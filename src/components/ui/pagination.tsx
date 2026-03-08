import { buttonVariants, type Button } from "@/components/ui/button";
import { cn } from "@/utils/cn";
import { createLink } from "@tanstack/react-router";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MoreHorizontalIcon,
} from "lucide-react";
import { ComponentProps } from "react";

export function Pagination({ className, ...props }: ComponentProps<"nav">) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
    />
  );
}

export function PaginationContent({
  className,
  ...props
}: ComponentProps<"ul">) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn("flex flex-row items-center gap-1", className)}
      {...props}
    />
  );
}

export function PaginationItem({ ...props }: ComponentProps<"li">) {
  return <li data-slot="pagination-item" {...props} />;
}

type BasicPaginationLinkProps = {
  isActive?: boolean;
} & Pick<ComponentProps<typeof Button>, "size"> &
  ComponentProps<"a">;

function BasicPaginationLink({
  className,
  isActive,
  size = "icon",
  ...props
}: BasicPaginationLinkProps) {
  return (
    <a
      aria-current={isActive ? "page" : undefined}
      data-slot="pagination-link"
      data-active={isActive}
      className={cn(
        buttonVariants({
          variant: isActive ? "outline" : "ghost",
          size,
        }),
        className,
      )}
      {...props}
    />
  );
}

export const PaginationLink = createLink(BasicPaginationLink);

export const PaginationPrevious = createLink(
  ({ className, ...props }: BasicPaginationLinkProps) => {
    return (
      <BasicPaginationLink
        aria-label="Go to previous page"
        size="default"
        className={cn("gap-1 px-2.5 sm:pl-2.5", className)}
        {...props}
      >
        <ChevronLeftIcon />
        <span className="hidden sm:block">Previous</span>
      </BasicPaginationLink>
    );
  },
);

export const PaginationNext = createLink(
  ({ className, ...props }: BasicPaginationLinkProps) => {
    return (
      <BasicPaginationLink
        aria-label="Go to next page"
        size="default"
        className={cn("gap-1 px-2.5 sm:pr-2.5", className)}
        {...props}
      >
        <span className="hidden sm:block">Next</span>
        <ChevronRightIcon />
      </BasicPaginationLink>
    );
  },
);

export function PaginationEllipsis({
  className,
  ...props
}: ComponentProps<"span">) {
  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      className={cn("flex size-9 items-center justify-center", className)}
      {...props}
    >
      <MoreHorizontalIcon className="size-4" />
      <span className="sr-only">More pages</span>
    </span>
  );
}
