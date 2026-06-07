/* TODO: Improve this AI generated component */
import { ExternalLinkIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

interface MediaDetailsStatsProps {
  status: string;
  originalLanguage: string;
  voteCount: number;
  homepage?: string;
}

const LANGUAGE_NAMES = new Intl.DisplayNames(["en"], { type: "language" });

function formatLanguage(code: string): string {
  try {
    return LANGUAGE_NAMES.of(code) ?? code.toUpperCase();
  } catch {
    return code.toUpperCase();
  }
}

function formatVoteCount(count: number): string {
  return new Intl.NumberFormat("en", { notation: "compact" }).format(count);
}

export function MediaDetailsStats({
  status,
  originalLanguage,
  voteCount,
  homepage,
}: MediaDetailsStatsProps) {
  return (
    <dl className="border-border/20 bg-card/50 flex flex-wrap items-center gap-x-6 gap-y-4 rounded-2xl border p-5 backdrop-blur-sm">
      <StatItem label="Status">
        <Badge variant="outline" size="md">
          {status}
        </Badge>
      </StatItem>

      <Separator orientation="vertical" className="hidden h-8 sm:block" />

      <StatItem label="Original Language">
        <span className="font-semibold">{formatLanguage(originalLanguage)}</span>
      </StatItem>

      <Separator orientation="vertical" className="hidden h-8 sm:block" />

      <StatItem label="User Votes">
        <span className="font-semibold">{formatVoteCount(voteCount)}</span>
      </StatItem>

      {homepage && (
        <>
          <Separator orientation="vertical" className="hidden h-8 sm:block" />
          <StatItem label="Homepage">
            <a
              href={homepage}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 flex items-center gap-1 font-semibold transition-colors"
            >
              Visit site
              <ExternalLinkIcon className="size-3.5" />
            </a>
          </StatItem>
        </>
      )}
    </dl>
  );
}

function StatItem({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      <dt className="text-muted-foreground text-xs font-medium tracking-wider uppercase">
        {label}
      </dt>
      <dd className="text-sm">{children}</dd>
    </div>
  );
}

export function MediaDetailsStatsSkeleton() {
  return (
    <div className="border-border/20 bg-card/50 flex flex-wrap gap-6 rounded-2xl border p-5">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="flex flex-col gap-2">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-5 w-24" />
        </div>
      ))}
    </div>
  );
}
