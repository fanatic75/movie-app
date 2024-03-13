import { RESTDataSource } from "@apollo/datasource-rest";

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
  id: string;
  url: string;
  created_at: string;
  updated_at: string;
  author_details:{
    name:string;
    username:string;
    avatar_path:string;
    rating:number;
  };
}

export type ReviewResults = {
  id: number;
  page:number;
  results: Review[];
  total_pages: number;
  total_results: number;
}

export class MoviesAPI extends RESTDataSource {
  override baseURL?: string | undefined = process.env.MOVIE_API_URL;

  async getPopularMovies(page: number = 1) {
    const data: PopularMovieResults = await this.get(
      `${this.baseURL}/movie/popular`,
      {
        params: {
          language: "en-US",
          page: page.toString(),
          api_key: process.env.MOVIE_API_KEY,
        },
        headers: {
          ContentType: "application/json",
        },
      }
    );
    return data;
  }

  async getMovie(id: number) {
    const data = await this.get<Movie>(`${this.baseURL}/movie/${id}`, {
      params: {
        language: "en-US",
        api_key: process.env.MOVIE_API_KEY,
      },
    });
    return data
  }

  async getMovieReviews(id: number) {
    const data = await this.get<ReviewResults>(`${this.baseURL}/movie/${id}/reviews`, {
      params: {
        language: "en-US",
        page: "1",
        api_key: process.env.MOVIE_API_KEY,
      },
    });
    return data
  }

  async searchMovie(title: string) {
    return this.get<SearchMovieResults>(`${this.baseURL}/search/movie?query=${title}`, {
      params: {
        language: "en-US",
        api_key: process.env.MOVIE_API_KEY,
        page: "1"
      }
    })
  }
}
