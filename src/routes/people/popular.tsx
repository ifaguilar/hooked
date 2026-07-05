import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";

import { CardGrid, CardGridSkeleton } from "@/components/layout/card-grid";
import { ListPagination } from "@/components/layout/list-pagination";
import { PageContainer } from "@/components/layout/page-container";
import { PageSection } from "@/components/layout/page-section";
import { TypographyH2 } from "@/components/ui/typography";
import { personQueries } from "@/features/people/api/queries";
import { PersonCard } from "@/features/people/components/person-card";
import { TMDBListParamsSchema } from "@/lib/tmdb/utils/schemas";

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
        <Suspense fallback={<CardGridSkeleton />}>
          <PopularPeopleList />
        </Suspense>
      </PageSection>
    </PageContainer>
  );
}

function PopularPeopleList() {
  const search = Route.useSearch();
  const { data: popularPeople } = useSuspenseQuery(
    personQueries.popular(search),
  );

  return (
    <>
      <CardGrid>
        {popularPeople.results.map((person) => (
          <PersonCard key={person.id} person={person} />
        ))}
      </CardGrid>
      <ListPagination
        currentPage={popularPeople.page}
        totalPages={popularPeople.total_pages}
        from={Route.fullPath}
      />
    </>
  );
}
