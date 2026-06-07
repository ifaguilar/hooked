import { linkOptions } from "@tanstack/react-router";

import type { Person } from "@/lib/tmdb/types/images";

export function getPersonDetails(person: Person) {
  const knownFor = person.known_for
    ?.map((work) => work.title || work.name)
    .filter(Boolean)
    .slice(0, 3)
    .join(", ");

  return {
    knownFor,
    linkOptions: linkOptions({
      to: "/people/$personId",
      params: { personId: String(person.id) },
    }),
  };
}
