import { ReviewResults } from "../app/api/graphql/movies-data-resource";

function ReviewsSection({ reviews }: { reviews: ReviewResults }) {
  return (
    <div className="flex flex-col items-center mt-4">
      <h2 className="text-3xl font-bold">Reviews</h2>
      <div className="flex  flex-col items-center px-24 py-4 gap-4">
        {reviews.results.map((review) => (
          <div
            key={review.id}
            className="flex card w-full shadow-xl bg-base-200  flex-col p-4"
          >
            <h3 className=" align-center text-accent my-2">
              {`A review by `}<span className="text-bold text-xl">{review.author}</span> {review.author_details.rating}
              <svg
                className="inline-flex w-4 h-4 text-yellow-300 mb-1"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>{" "}
            </h3>
            <p className="text-neutral-content">{review.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ReviewsSection;
