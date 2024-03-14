import { Review } from "@/types/types";
import DOMPurify from "isomorphic-dompurify";
function ReviewsSection({
  reviews,
  editedReview,
  setEditedReview,
  reviewContent, 
  setReviewContent,
}: {
  reviews: Review[];
  editedReview: Review | null;
  setEditedReview: (review: Review | null) => void;
  reviewContent: { content: string; name: string };
  setReviewContent: ({content, name} : {content:string, name:string}) => void;
}) {
  return (
    <div className="flex flex-col items-center mt-4">
      <h2 className="text-3xl font-bold">Reviews</h2>
      <div className="flex  flex-col items-center w-full px-4 md:px-8 lg:px-24 py-4 gap-4">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="flex card w-full shadow-xl bg-base-200 flex-col p-4"
          >
            <h3 className=" align-center text-accent my-2">
              {`A review by `}
              <span className="text-bold text-xl">{review.author}</span>{" "}
              <button
                onClick={() => {
                  if (editedReview && editedReview.id === review.id) {
                    setReviewContent({ content: "", name: "" });
                    setEditedReview(null);
                  } else {
                    setReviewContent({
                      content: review.content,
                      name: review.author,
                    });
                    setEditedReview(review);
                  }

                }}
                className="px-2 py-1 text-sm btn-accent btn-outline rounded-md float-right "
              >
                {editedReview?.id === review.id ? "Cancel" : "Edit"}
              </button>
            </h3>
            <p
              className="text-neutral-content break-words"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(review.content),
              }}
            ></p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ReviewsSection;
