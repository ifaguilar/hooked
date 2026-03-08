import {
  MediaCarousel,
  MediaCarouselSkeleton,
} from "@/components/layout/media-carousel";
import { MediaHero, MediaHeroSkeleton } from "@/components/layout/media-hero";
import { PageContainer } from "@/components/layout/page-container";
import { PageSection } from "@/components/layout/page-section";
import { buttonVariants } from "@/components/ui/button";
import { TypographyH2 } from "@/components/ui/typography";
import { movieQueries } from "@/features/movies/api/queries";
import { tvShowQueries } from "@/features/tv-shows/api/queries";
import { cn } from "@/utils/cn";
import { FIRST_PAGE } from "@/utils/constants";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Suspense } from "react";

export const Route = createFileRoute("/")({
  component: HomePage,
  loader: ({ context }) => {
    context.queryClient.prefetchQuery(
      movieQueries.popular({ page: FIRST_PAGE }),
    );
    context.queryClient.prefetchQuery(
      tvShowQueries.popular({ page: FIRST_PAGE }),
    );
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
  const { data } = useSuspenseQuery(movieQueries.popular({ page: FIRST_PAGE }));
  const results = data.results;

  if (!results.length) return null;

  const randomIndex = Math.floor(Math.random() * results.length);
  const featured = results[randomIndex];

  return <MediaHero type="movie" media={featured} />;
}

function TrendingMovies() {
  const { data } = useSuspenseQuery(movieQueries.popular({ page: FIRST_PAGE }));

  return <MediaCarousel items={data.results} type="movie" />;
}

function TrendingTvShows() {
  const { data } = useSuspenseQuery(
    tvShowQueries.popular({ page: FIRST_PAGE }),
  );

  return <MediaCarousel items={data.results} type="tv" />;
}
