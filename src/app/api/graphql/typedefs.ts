import { gql } from "graphql-tag";
export const typeDefs = gql`
  type Movie {
    adult: Boolean
    backdrop_path: String
    genre_ids: [Int]
    id: Int
    original_language: String
    original_title: String
    overview: String
    popularity: Float
    poster_path: String
    release_date: String
    title: String
    video: Boolean
    vote_average: Float
    vote_count: Int
  }

  type PopularMovieResults {
    results: [Movie]
    page: Int
    total_results: Int
    total_pages: Int
  }

  type SearchMovieResults{
    page: Int
    results: [Movie]
    total_pages: Int
    total_results: Int
  }

  type Review {
    author: String
    content: String
    id: String
    url: String
    created_at: String
    updated_at: String
    author_details: AuthorDetails
  }

  type AuthorDetails{
    name: String
    username: String
    avatar_path: String
    rating: Int
  }

  type ReviewResults{
    id: Int
    page: Int
    results: [Review]
    total_pages: Int
    total_results: Int
  }


  type Query {
    popularMovies(page: Int): PopularMovieResults
    getMovie(id: Int): Movie
    searchMovie(title: String): SearchMovieResults
    getMovieReviews(id: Int): ReviewResults
  }
  
`;
