"use client";

import React, { useState } from "react";
import MovieCard from "./moviecard";
import { Movie, PopularMovieResults } from "../app/api/graphql/movies-data-resource";
import Paginator from "./paginator";

function MovieList({data, page} : {data: PopularMovieResults, page:number}) {
  return (
    <div className="flex flex-col m-6 gap-6">
      <div className="flex justify-center">
        <Paginator
          currentPage={page}
          totalPages={Math.min(data?.total_pages ?? 0, 500)}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center">
        {data?.results?.map((movie: Movie) => (
          <MovieCard key={movie?.id} movie={movie} />
        ))}
      </div>
      <div className="flex justify-center">
        <Paginator
          currentPage={page}
          totalPages={Math.min(data?.total_pages ?? 0, 500)}
        />
      </div>
    </div>
  );
}

export default MovieList;