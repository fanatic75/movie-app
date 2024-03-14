"use client";

import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import {
  Movie,
  SearchMovieResults,
} from "@/types/types";
import createApolloClient from "../app/utils/apolloclient";
import { SEARCH_MOVIE_QUERY } from "../app/queries/movie";

export default function SearchBar() {
  const [title, setTitle] = useState("");
  const [movies, setMovies] = useState<Pick<Movie, "id" | "title">[]>();

  const apolloclient = createApolloClient();

  const handleSearch = (title: string) => {
    setTitle(title);
    searchMoviesDebouncedWrapper(title);
  };

  const searchMoviesDebouncedWrapper = useDebouncedCallback((title: string) => {
    if (title.length === 0) {
      return;
    }
    searchMovies(title);
  }, 300);

  const searchMovies = async (title: string) => {
    const { data } = await apolloclient.query<{
      searchMovie: SearchMovieResults;
    }>({
      query: SEARCH_MOVIE_QUERY,
      variables: {
        title: title,
      },
    });
    const list = data.searchMovie.results.slice(0, 5);
    setMovies(list);
  };

  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()} className="flex items-center">
        <input
          type="text"
          value={title}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search"
          className="w-60 p-2 rounded-l-md"
        />
        <button className="bg-blue-500 text-white p-2 rounded-r-md">
          Search
        </button>
      </form>

      <div className="flex flex-col bg-gray-200 absolute w-60 z-10">
        {movies?.map((movie) => (
          <a
            href={`/movie/${movie.id}`}
            key={movie.id}
            className="text-base text-accent font-semibold bg-base-200 p-2 text-left cursor-pointer"
          >
            {movie.title}
          </a>
        ))}
      </div>
    </div>
  );
}
