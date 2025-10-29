import { ApolloServer } from 'apollo-server';
import { typeDefs } from './schema/typeDefs';
import { resolvers } from './schema/resolvers';

const server = new ApolloServer({ typeDefs, resolvers });

(async function start() {
  await connectDB();
  server.listen({ port: 4000 }).then(({ url }: { url: string }) => {
    console.log(`🚀 Server ready at ${url}`);
  });
})();