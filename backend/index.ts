import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './schema/typeDefs';
import { resolvers } from './schema/resolvers';
import connectDB from './config/db';

(async function start() {
  await connectDB();

  const server = new ApolloServer({ typeDefs, resolvers });

  const port = Number(process.env.PORT) || 5000;
  const { url } = await startStandaloneServer(server, { listen: { port } });
  console.log(`🚀 Server ready at ${url}`);
})();