import { ApolloClient, InMemoryCache } from "@apollo/client";

const createApolloClient = () => {
  return new ApolloClient({
    uri: "https://movie-app-ashy-psi.vercel.app/api/graphql",
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;