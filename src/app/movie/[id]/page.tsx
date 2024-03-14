"use client";
import { Movie, Review } from "@/types/types";
import MovieDetailSection from "../../../components/moviedetailsection";
import ReviewsSection from "../../../components/reviewssection";
import Editor from "../../../components/editor";
import { useMutation, useQuery } from "@apollo/client";
import { useParams } from "next/navigation";
import { useState } from "react";
import {
  INSERT_REVIEW_MUTATION,
  EDIT_REVIEW_MUTATION,
} from "../../mutations/review";
import { GET_MOVIE_QUERY } from "../../queries/movie";
import { GET_REVIEW_QUERY } from "../../queries/review";

function Page() {
  const params = useParams<{ id: string }>();
  const { data } = useQuery<{ getMovie: Movie | null }>(GET_MOVIE_QUERY, {
    variables: {
      id: parseInt(params.id),
    },
  });
  const { data: reviewData } = useQuery<{ getReview: Review[] }>(
    GET_REVIEW_QUERY,
    {
      variables: {
        id: parseInt(params.id),
      },
    }
  );

  const [insertReview] = useMutation<Review>(INSERT_REVIEW_MUTATION, {
    refetchQueries: [GET_REVIEW_QUERY],
  });

  const [editReview] = useMutation<Review>(EDIT_REVIEW_MUTATION, {
    refetchQueries: [GET_REVIEW_QUERY],
  });

  const [editedReview, setEditedReview] = useState<Review | null>(null);
  const [reviewContent, setReviewContent] = useState({
    content: "",
    name: "",
  });

  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!reviewContent.content) {
      setError(true);
      return;
    }

    if (editedReview) {
      editReview({
        variables: {
          id: editedReview.id,
          content: reviewContent.content,
        },
      });
      setReviewContent({ content: "", name: "" });
      setEditedReview(null);
    } else {
      insertReview({
        variables: {
          review: {
            author: reviewContent.name,
            content: reviewContent.content,
            movieId: data?.getMovie?.id,
          },
        },
      });
      setReviewContent({ content: "", name: "" });
    }
  };
  return (
    <main className="flex min-h-screen flex-col ">
      {data && data.getMovie && <MovieDetailSection movie={data?.getMovie} />}
      {data &&
        data.getMovie &&
        reviewData &&
        reviewData.getReview.length > 0 && (
          <ReviewsSection
            editedReview={editedReview}
            setEditedReview={setEditedReview}
            reviewContent={reviewContent}
            setReviewContent={setReviewContent}
            reviews={reviewData.getReview}
          />
        )}
      {data && data.getMovie && (
        <div className="px-4 md:px-8 lg:px-24 py-4 bg-base-200">
          <div className="flex bg-base-200 items-center flex-col">
            <div className="w-full flex flex-col">
              <div className="text-3xl font-semibold text-accent">
                Write a review
              </div>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  required={true}
                  value={reviewContent.name}
                  placeholder="Your name"
                  onChange={(e) =>
                    setReviewContent({ ...reviewContent, name: e.target.value })
                  }
                  className="p-2 mt-4"
                />
                <div className="flex flex-col">
                  <Editor
                    content={reviewContent}
                    error={error}
                    setError={setError}
                    setContent={setReviewContent}
                  />
                  {error && (
                    <p className="text-red-500">Please enter a review</p>
                  )}
                  <button
                    type="submit"
                    className="bg-blue-500 text-white p-2 rounded-md mt-4"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default Page;
