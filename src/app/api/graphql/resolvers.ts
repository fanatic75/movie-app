import { get } from "http";
import { ContextValue } from "./route";

export const resolvers = {
  Query: {
    popularMovies: async (
      _ : unknown,
      { page }: { page: number },
      { dataSources }: ContextValue
    ) => {
      return dataSources.moviesAPI.getPopularMovies(page);
    },
    getMovie: async (
      _ : unknown,
      { id }: { id: number },
      { dataSources }: ContextValue
    ) => {
      return dataSources.moviesAPI.getMovie(id);
    }
  },
};
