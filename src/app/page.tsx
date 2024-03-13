import createApolloClient from "./utils/apolloclient";
import gql from "graphql-tag";
import {
  Movie,
  MoviesAPI,
  PopularMovieResults,
} from "./api/graphql/movies-data-resource";
import MovieList from "../components/movieList";

export default async function Home({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  const currentPage = searchParams.page ? parseInt(searchParams.page) : 1;
  const client = createApolloClient();
  let data =  {
    popularMovies: {
      results: [],
      page: 0,
      total_results: 0,
      total_pages: 0,
    } as PopularMovieResults,
  }
  try {
    const {data:d} = await client.query<{ popularMovies: PopularMovieResults }>(
      {
        query: gql`
          query GetPopularMovies($page: Int!) {
            popularMovies(page: $page) {
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
        `,
        variables: {
          page: currentPage,
        },
      }
    );
    data = d;
  } catch (err) {
    console.error(err);
    
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <MovieList data={data.popularMovies} page={currentPage} />
    </main>
  );
}
