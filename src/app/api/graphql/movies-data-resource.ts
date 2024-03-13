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


export class MoviesAPI extends RESTDataSource {
  override baseURL?: string | undefined = process.env.MOVIE_API_URL;

  async getPopularMovies(page: number = 1) {
    try{
      const data: PopularMovieResults = await this.get(`${this.baseURL}/movie/popular`, {
        params: {
          language: "en-US",
          page: page.toString(),
          api_key: process.env.MOVIE_API_KEY,
        },
        cacheOptions: {
          ttl: 0,
        },
        headers:{
          ContentType: "application/json"
        }
      });
      return data;
    } catch (error) {
      return {
        results: [],
        page: 0,
        total_results: 0,
        total_pages: 0
      }
    }  
  }

  async getMovie(id: number) {
    return this.get(`${this.baseURL}/movie/${id}`, {
      params: {
        language: "en-US",
        api_key: process.env.MOVIE_API_KEY,
      },
    });
  }
}
