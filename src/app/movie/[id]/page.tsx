import createApolloClient from "../../utils/apolloclient";
import gql from "graphql-tag";
import { Movie, ReviewResults } from "../../api/graphql/movies-data-resource";
import MovieDetailSection from "../../../components/moviedetailsection";

async function Page({ params }: { params: { id: string } }) {
  const client = createApolloClient();
  const [{ data }, { data:reviewData }] = await Promise.all([
    client.query<{ getMovie: Movie }>({
      query: gql`
        query GetMovieQuery($id: Int!) {
          getMovie(id: $id) {
            title
            overview
            poster_path
            release_date
          }
        }
      `,
      variables: {
        id: parseInt(params.id),
      },
    }),
    client.query<{ getMovieReviews: ReviewResults }>({
      query: gql`
        query getReview($id: Int!) {
          getMovieReviews(id: $id) {
            results {
              author
              content
              id
              created_at
              author_details {
                name
                rating
              }
            }
            page
            total_results
            total_pages
          }
        }
      `,
      variables: {
        id: parseInt(params.id),
      }
    }),
  ]);

  console.log(reviewData);

  return (
    <main className="flex min-h-screen flex-col ">
      <MovieDetailSection movie={data.getMovie} />
    </main>
  );
}

export default Page;
