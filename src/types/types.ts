export type Movie = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type PopularMovieResults = {
  results: Movie[];
  page: number;
  total_results: number;
  total_pages: number;
};

export type SearchMovieResults = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};

export type Review = {
  author: string;
  content: string;
  id: number;
  movieId: number;
};

export type NewReview = Omit<Review, "id">;
