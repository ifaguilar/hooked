import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Suspense } from "react";

import { MediaCarousel, MediaCarouselSkeleton } from "@/components/layout/media-carousel";
import { MediaHero, MediaHeroSkeleton } from "@/components/layout/media-hero";
import { PageContainer } from "@/components/layout/page-container";
import { PageSection } from "@/components/layout/page-section";
import { buttonVariants } from "@/components/ui/button";
import { TypographyH2 } from "@/components/ui/typography";
import { movieQueries } from "@/features/movies/api/queries";
import { tvShowQueries } from "@/features/tv-shows/api/queries";
import { cn } from "@/utils/cn";
import { FIRST_PAGE } from "@/utils/constants";

export const Route = createFileRoute("/")({
  component: HomePage,
  loader: ({ context }) => {
    context.queryClient.prefetchQuery(movieQueries.popular({ page: FIRST_PAGE }));
    context.queryClient.prefetchQuery(tvShowQueries.popular({ page: FIRST_PAGE }));

    return { randomMediaSeed: Math.random() };
  },
});

function HomePage() {
  return (
    <>
      <Suspense fallback={<MediaHeroSkeleton />}>
        <FeaturedHero />
      </Suspense>
      <PageContainer>
        <PageSection>
          <div className="flex items-center justify-between">
            <TypographyH2>Trending Movies</TypographyH2>
            <Link
              to="/movies/popular"
              search={{ page: FIRST_PAGE }}
              className={cn(
                buttonVariants({
                  variant: "link",
                }),
              )}
            >
              View all
            </Link>
          </div>
          <Suspense fallback={<MediaCarouselSkeleton />}>
            <TrendingMovies />
          </Suspense>
        </PageSection>

        <PageSection>
          <div className="flex items-center justify-between">
            <TypographyH2>Trending TV Shows</TypographyH2>
            <Link
              to="/tv-shows/popular"
              search={{ page: FIRST_PAGE }}
              className={cn(
                buttonVariants({
                  variant: "link",
                }),
              )}
            >
              View all
            </Link>
          </div>
          <Suspense fallback={<MediaCarouselSkeleton />}>
            <TrendingTvShows />
          </Suspense>
        </PageSection>
      </PageContainer>
    </>
  );
}

function FeaturedHero() {
  const { randomMediaSeed } = Route.useLoaderData();

  const { data: popularMovies } = useSuspenseQuery(movieQueries.popular({ page: FIRST_PAGE }));

  const { data: popularTvShows } = useSuspenseQuery(tvShowQueries.popular({ page: FIRST_PAGE }));

  const movies = popularMovies.results.map((media) => ({
    type: "movie" as const,
    media,
  }));

  const tvShows = popularTvShows.results.map((media) => ({
    type: "tv" as const,
    media,
  }));

  const allMedia = [...movies, ...tvShows];

  if (allMedia.length === 0) return null;

  const randomIndex = Math.floor(randomMediaSeed * allMedia.length);
  const featured = allMedia[randomIndex];

  return <MediaHero {...featured} />;
}

function TrendingMovies() {
  const { data: popularMovies } = useSuspenseQuery(movieQueries.popular({ page: FIRST_PAGE }));

  return <MediaCarousel items={popularMovies.results} type="movie" />;
}

function TrendingTvShows() {
  const { data: popularTvShows } = useSuspenseQuery(tvShowQueries.popular({ page: FIRST_PAGE }));

  return <MediaCarousel items={popularTvShows.results} type="tv" />;
}
