import { Link } from "@tanstack/react-router";
import { TrendingUp, User } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getTMDBImageUrl } from "@/lib/tmdb/tmdb-images";
import type { Person } from "@/types/tmdb";
import { getPersonDetails } from "@/utils/details";

interface PersonCardProps {
  person: Person;
}

export function PersonCard({ person }: PersonCardProps) {
  const imageUrl = getTMDBImageUrl(person.profile_path, "h632");

  const { knownFor, linkProps } = getPersonDetails(person);

  return (
    <Link {...linkProps} className="group">
      <Card className="border-border/10 bg-card/50 relative h-full overflow-hidden pt-0 shadow-sm backdrop-blur-sm hover:shadow-md">
        <div className="relative aspect-2/3 overflow-hidden">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={person.name}
              className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="bg-muted/30 flex size-full items-center justify-center transition-transform duration-300 group-hover:scale-105">
              <User className="text-muted-foreground/50 size-16 stroke-[1.5]" />
            </div>
          )}
          <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />

          {person.popularity !== undefined ? (
            <Badge
              variant="secondary"
              size="md"
              className="bg-background/60 absolute top-3 right-3 border border-white/10 font-bold shadow-sm backdrop-blur-xl"
            >
              <TrendingUp className="text-primary size-3.5" />
              <span>{person.popularity.toFixed(1)}</span>
            </Badge>
          ) : null}
        </div>

        <CardHeader>
          <CardTitle className="group-hover:text-primary truncate text-base font-bold tracking-tight transition-colors">
            {person.name}
          </CardTitle>
          <CardDescription className="line-clamp-2 min-h-10 text-xs">
            <span className="text-muted-foreground/85 mb-1 block text-[10px] font-semibold tracking-wider uppercase">
              {person.known_for_department}
            </span>
            {knownFor ? (
              <span className="line-clamp-1 block" title={knownFor}>
                Known for: {knownFor}
              </span>
            ) : null}
          </CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}
