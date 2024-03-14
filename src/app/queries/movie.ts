import gql from "graphql-tag";

export const GET_MOVIE_QUERY = gql`
  query GetMovieQuery($id: Int!) {
    getMovie(id: $id) {
      id
      title
      overview
      poster_path
      release_date
    }
  }
`;

export const GET_POPULAR_MOVIES = gql`
  query GetPopularMovies($page: Int!) {
    getPopularMovies(page: $page) {
      results {
        id
        title
        poster_path
        release_date
      }
      page
      total_results
      total_pages
    }
  }
`;

export const SEARCH_MOVIE_QUERY = gql`
        query GetMovie($title: String!) {
          searchMovie(title: $title) {
            results {
              id
              title
            }
            page
            total_results
            total_pages
          }
        }
      `