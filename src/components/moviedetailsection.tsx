import { Movie } from "../app/api/graphql/movies-data-resource";
import Image from "next/image";
import { getPosterUrl } from "../lib/tmdbImage";
function MovieDetailSection({ movie }: { movie: Movie }) {
  return (
    <section className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl text-accent font-bold mb-4">{movie.title}</h2>
            <p className="text-lg text-neutral-content mb-6">{movie.overview}</p>
            
            <div className="flex items-center">
              <span className="text-sm text-neutral-content mr-2">Release Date:</span>
              <span className="text-lg text-neutral-content font-semibold">
                {movie.release_date}
              </span>
            </div>
          </div>
          <div className="flex justify-center md:justify-end">
            <Image
              src={getPosterUrl({
                fileSize: "w500",
                filePath: movie?.poster_path!,
              })}
              priority
              alt={movie?.title!}
              width={100}
              height={100}
              className="w-full md:w-2/3 h-auto rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}


export default MovieDetailSection;