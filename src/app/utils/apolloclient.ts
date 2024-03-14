import { ApolloClient, InMemoryCache } from "@apollo/client";
import { typeDefs } from "@/types/typedefs";

const createApolloClient = () => {
  return new ApolloClient({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_API_URL,
    cache: new InMemoryCache(),
    typeDefs: typeDefs
  });
};

export default createApolloClient;