import dayjs from "dayjs";
import { Movie } from "../app/api/graphql/movies-data-resource";
import { getPosterUrl } from "../lib/tmdbImage";
import Image from "next/image";
export default function MovieCard({
  movie,
}: {
  movie: Pick<Movie, "id" | "title" | "release_date" | "poster_path">;
}) {
  return (
    <div key={movie?.id} className="card shadow-xl bg-base-200 max-w-[342px]">
      <figure>
        <Image
          src={getPosterUrl({
            fileSize: "w342",
            filePath: movie?.poster_path!,
          })}
          priority
          alt={movie?.title!}
          width={342}
          height={513}
        />
      </figure>
      <div className="p-4 flex flex-col gap-2">
        <h2 className="font-semibold text-base text-accent">{movie?.title}</h2>
        <p className="text-sm text-neutral-content">
          {dayjs(movie?.release_date).format("MMM DD, YYYY")}
        </p>
      </div>
    </div>
  );
}
