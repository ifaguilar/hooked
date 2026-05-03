import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";

import { MediaGridSkeleton } from "@/components/layout/media-grid";
import { PageContainer } from "@/components/layout/page-container";
import { PageSection } from "@/components/layout/page-section";
import { TypographyH2 } from "@/components/ui/typography";
import { personQueries } from "@/features/people/api/queries";
import { TMDBListParamsSchema } from "@/schemas/tmdb";

export const Route = createFileRoute("/people/popular")({
  component: PopularPeoplePage,
  validateSearch: TMDBListParamsSchema,
  loaderDeps: ({ search }) => ({
    page: search.page,
  }),
  loader: ({ context, deps }) => {
    context.queryClient.prefetchQuery(personQueries.popular(deps));
  },
});

function PopularPeoplePage() {
  return (
    <PageContainer>
      <PageSection>
        <TypographyH2>Popular</TypographyH2>
        <Suspense fallback={<MediaGridSkeleton />}>
          <PopularPeopleList />
        </Suspense>
      </PageSection>
    </PageContainer>
  );
}

function PopularPeopleList() {
  const search = Route.useSearch();
  const { data: popularPeople } = useSuspenseQuery(personQueries.popular(search));

  console.log("popularPeople", popularPeople);

  /* TODO: Create a component for displaying people */
  return <></>;
}
