export type BackdropSize = "w300" | "w780" | "w1280" | "original";
export type PosterSize =
  | "w92"
  | "w154"
  | "w185"
  | "w342"
  | "w500"
  | "w780"
  | "original";

export type GetPosterUrlParams = {
  fileSize: PosterSize;
  filePath: string;
};

const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/";

export function getPosterUrl({ fileSize, filePath }: GetPosterUrlParams) {
  return `${BASE_IMAGE_URL}${fileSize}${filePath}`;
}