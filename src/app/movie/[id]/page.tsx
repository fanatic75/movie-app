'use client';
import gql from "graphql-tag";
import { Movie, Review } from "../../api/graphql/movies-data-resource";
import MovieDetailSection from "../../../components/moviedetailsection";
import ReviewsSection from "../../../components/reviewssection";
import Editor from "../../../components/editor";
import { useQuery } from "@apollo/client";
import { useParams } from "next/navigation";

const GET_MOVIE_QUERY = gql`
query GetMovieQuery($id: Int!) {
  getMovie(id: $id) {
    title
    overview
    poster_path
    release_date
  }
}
`;

const GET_REVIEW_QUERY = gql`
query getReviewQuery($id: Int!) {
  getMovieReviews(id: $id) {
    author
    content
    id
  }
}
`;

function Page() {
  const params = useParams<{id:string}>();
  const {loading, error, data} = useQuery<{getMovie: Movie | null}>(GET_MOVIE_QUERY, {
    variables: {
    id: parseInt(params.id),
    },
  });
  const {loading: reviewLoading, error: reviewError, data: reviewData} = useQuery<{getMovieReviews: Review[]}>(GET_REVIEW_QUERY, {
    variables: {
      id: parseInt(params.id),
    },
  });
  
  return (
    <main className="flex min-h-screen flex-col ">
      {data && data.getMovie && <MovieDetailSection movie={data?.getMovie} />}
      {data && data.getMovie && reviewData && reviewData.getMovieReviews.length > 0 && (
        <ReviewsSection reviews={reviewData.getMovieReviews} />
      )}
      {data && data.getMovie && <div className="px-4 md:px-8 lg:px-24 py-4 bg-base-200">
        <Editor />
      </div> }
    </main>
  );
}

export default Page;
