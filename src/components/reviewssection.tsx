import { Review } from "../app/api/graphql/movies-data-resource";

function ReviewsSection({ reviews }: { reviews: Review[] }) {
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
            </h3>
            <p className="text-neutral-content break-words">{review.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ReviewsSection;
