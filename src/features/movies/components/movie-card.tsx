import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { Movie } from "@/features/movies/types/movie-list";
import { formatReleaseYear, formatVoteAverage } from "@/features/movies/utils/format";
import { getTMDBImageUrl } from "@/lib/tmdb/tmdb-images";
import { StarIcon } from "lucide-react";

interface MovieCardProps {
  movie: Movie;
}

export function MovieCard({ movie }: MovieCardProps) {
  return (
    <Card className="pt-0 overflow-hidden relative">
      <img
        src={getTMDBImageUrl(movie.poster_path, "w500")}
        alt={movie.title}
        className="aspect-2/3 object-cover"
      />
      <Badge variant="secondary" className="absolute top-2 right-2">
        <StarIcon />
        <span>{formatVoteAverage(movie.vote_average)}</span>
      </Badge>
      <CardHeader>
        <CardTitle className="truncate">{movie.title}</CardTitle>
        <CardDescription>{formatReleaseYear(movie.release_date)}</CardDescription>
      </CardHeader>
    </Card>
  );
}
