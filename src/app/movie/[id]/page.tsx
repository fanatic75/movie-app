import createApolloClient from "../../utils/apolloclient";
import gql from "graphql-tag";
import { Movie, ReviewResults } from "../../api/graphql/movies-data-resource";
import MovieDetailSection from "../../../components/moviedetailsection";
import ReviewsSection from "../../../components/reviewssection";

async function Page({ params }: { params: { id: string } }) {
  const client = createApolloClient();
  let [{ data }, { data: reviewData }] = await Promise.all([
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
      },
    }),
  ]);

  return (
    <main className="flex min-h-screen flex-col ">
      <MovieDetailSection movie={data.getMovie} />
      {reviewData.getMovieReviews.results.length > 0 && <ReviewsSection reviews={reviewData.getMovieReviews}/>}
      {/* <div className="px-24 py-4 bg-base-200">
        <Editor />
      </div> */}
    </main>
  );
}

export default Page;
