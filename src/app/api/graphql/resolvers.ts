import { ContextValue } from "./route";
import { NewReview } from "@/lib/db";

export const resolvers = {
  Query: {
    popularMovies: async (
      _: unknown,
      { page }: { page: number },
      { dataSources }: ContextValue
    ) => {
      return dataSources.moviesAPI.getPopularMovies(page);
    },
    getMovie: async (
      _: unknown,
      { id }: { id: number },
      { dataSources }: ContextValue
    ) => {
      return dataSources.moviesAPI.getMovie(id);
    },
    searchMovie: async (
      _: unknown,
      { title }: { title: string },
      { dataSources }: ContextValue
    ) => {
      return dataSources.moviesAPI.searchMovie(title);
    },

    getMovieReviews: async (
      _: unknown,
      { id }: { id: number },
      { dataSources }: ContextValue
    ) => {
      return dataSources.moviesAPI.getMovieReviews(id);
    },
  },
  Mutation: {
    insertMovieReview: async (
      _: unknown,
      { review }: { review: NewReview },
      { dataSources }: ContextValue
    ) => {
      return dataSources.moviesAPI.insertMovieReview(review);
    },
  },
};
