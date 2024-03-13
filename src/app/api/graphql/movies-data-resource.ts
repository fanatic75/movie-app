import { RESTDataSource } from "@apollo/datasource-rest";
import { db, NewReview, ReviewsTable } from "@/lib/db";
import { desc, eq } from "drizzle-orm";
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
};

export class MoviesAPI extends RESTDataSource {
  override baseURL?: string | undefined = process.env.MOVIE_API_URL;

  async getPopularMovies(page: number = 1) {
    try {
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
    } catch (e) {
      return {
        results: [],
        page: 0,
        total_results: 0,
        total_pages: 0,
      };
    }
  }

  async getMovie(id: number) {
    try {
      const data = await this.get<Movie>(`${this.baseURL}/movie/${id}`, {
        params: {
          language: "en-US",
          api_key: process.env.MOVIE_API_KEY,
        },
      });
      return data;
    } catch (err) {
      return null;
    }
  }

  async getMovieReviews(id: number) {
    try {
      const data = await db
        .select()
        .from(ReviewsTable)
        .where(eq(ReviewsTable.movieId, id))
        .limit(10)
        .orderBy(desc(ReviewsTable.id));
      return data;
    } catch (err) {
      return [];
    }
  }

  async insertMovieReview(review: NewReview) {
    try {
      const data = await db.insert(ReviewsTable).values(review).returning();
      return data[0];
    } catch (err) {
      return null;
    }
  }

  async searchMovie(title: string) {
    try{
      return this.get<SearchMovieResults>(
        `${this.baseURL}/search/movie?query=${title}`,
        {
          params: {
            language: "en-US",
            api_key: process.env.MOVIE_API_KEY,
            page: "1",
          },
        }
      );
    }catch(err){
      return {
        page: 0,
        results: [],
        total_pages: 0,
        total_results: 0,
      };
    }
  }
}
