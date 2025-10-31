export function tmdbImage(
  path: string | null | undefined,
  size: "w342" | "w500" | "w780" | "w1280" | "original" = "w500"
) {
  if (!path) return "";
  return `https://image.tmdb.org/t/p/${size}${path}`;
}
