import { TypographyH2 } from "@/components/ui/typography";
import { getNowPlayingMovies } from "@/features/movies/api/get-now-playing-movies";
import { getPopularMovies } from "@/features/movies/api/get-popular-movies";
import { getTopRatedMovies } from "@/features/movies/api/get-top-rated-movies";
import { getUpcomingMovies } from "@/features/movies/api/get-upcoming-movies";
import { MovieCarousel } from "@/features/movies/components/movie-carousel";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: HomePage,
  loader: async () => {
    const popularMovies = await getPopularMovies();
    const topRatedMovies = await getTopRatedMovies();
    const upcomingMovies = await getUpcomingMovies();
    const nowPlayingMovies = await getNowPlayingMovies();

    return {
      popularMovies,
      topRatedMovies,
      upcomingMovies,
      nowPlayingMovies,
    };
  },
});

function HomePage() {
  const { popularMovies, topRatedMovies, upcomingMovies, nowPlayingMovies } = Route.useLoaderData();

  return (
    <div className="container mx-auto p-4 flex flex-col gap-12">
      <section className="flex flex-col gap-4">
        <TypographyH2>Popular Movies</TypographyH2>
        <MovieCarousel movies={popularMovies.results} />
      </section>

      <section className="flex flex-col gap-4">
        <TypographyH2>Top Rated Movies</TypographyH2>
        <MovieCarousel movies={topRatedMovies.results} />
      </section>

      <section className="flex flex-col gap-4">
        <TypographyH2>Upcoming Movies</TypographyH2>
        <MovieCarousel movies={upcomingMovies.results} />
      </section>

      <section className="flex flex-col gap-4">
        <TypographyH2>Now Playing Movies</TypographyH2>
        <MovieCarousel movies={nowPlayingMovies.results} />
      </section>
    </div>
  );
}
