export function formatVoteAverage(vote: number): string {
  return vote.toFixed(1);
}

export function formatMediaYear(date: string | undefined): string | null {
  if (!date) return null;

  const parsedDate = new Date(date);
  return isNaN(parsedDate.getTime()) ? null : String(parsedDate.getFullYear());
}
