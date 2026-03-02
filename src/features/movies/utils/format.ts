export function formatVoteAverage(vote: number): string {
  return vote.toFixed(1);
}

export function formatReleaseYear(date: string | undefined): string {
  if (!date) return "";

  const year = date.split("-")[0];

  return year || "";
}
