import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { ApolloServer } from "@apollo/server";
import { MoviesAPI } from "./movies-data-resource";
import { resolvers } from "./resolvers";
import { typeDefs } from "./typedefs";
export interface ContextValue {
  dataSources:{
    moviesAPI: MoviesAPI
  }
}

const server = new ApolloServer<ContextValue>({
  typeDefs: typeDefs, 
  resolvers: resolvers,
});

const handler = startServerAndCreateNextHandler(server, {
  context: async () =>{
  const {cache}  = server;
    return {
      dataSources: {
        moviesAPI: new MoviesAPI({cache})
      }
    }
  }
});

export {handler as GET, handler as POST}

