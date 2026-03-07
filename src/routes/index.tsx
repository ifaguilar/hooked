import { PageContainer } from "@/components/shared/page-container";
import { TypographyH2 } from "@/components/ui/typography";
// import { MovieCarousel } from "@/features/movies/components/movie-carousel";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  return (
    <PageContainer>
      <section className="flex flex-col gap-4">
        <TypographyH2>Popular Movies</TypographyH2>
        {/* <MovieCarousel movies={popularMovies.results} /> */}
      </section>

      <section className="flex flex-col gap-4">
        <TypographyH2>Top Rated Movies</TypographyH2>
        {/* <MovieCarousel movies={topRatedMovies.results} /> */}
      </section>

      <section className="flex flex-col gap-4">
        <TypographyH2>Upcoming Movies</TypographyH2>
        {/* <MovieCarousel movies={upcomingMovies.results} /> */}
      </section>

      <section className="flex flex-col gap-4">
        <TypographyH2>Now Playing Movies</TypographyH2>
        {/* <MovieCarousel movies={nowPlayingMovies.results} /> */}
      </section>
    </PageContainer>
  );
}
