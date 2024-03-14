import createApolloClient from "./utils/apolloclient";
import { PopularMovieResults } from "@/types/types";
import MovieList from "../components/movieList";
import { GET_POPULAR_MOVIES } from "./queries/movie";

export default async function Home({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  const currentPage = searchParams.page ? parseInt(searchParams.page) : 1;
  const client = createApolloClient();

  const { data } = await client.query<{
    getPopularMovies: PopularMovieResults;
  }>({
    query: GET_POPULAR_MOVIES,
    variables: {
      page: currentPage,
    },
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <MovieList data={data.getPopularMovies} page={currentPage} />
    </main>
  );
}
