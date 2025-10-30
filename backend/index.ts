import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import competenceType from './graphql/schema/competence';
import connectDB from './config/db';

(async function start() {
  await connectDB();

  const typeDefs = [competenceType];
  const resolvers = {}; 

  const server = new ApolloServer({ typeDefs, resolvers });

  const port = Number(process.env.PORT) || 5000;
  const { url } = await startStandaloneServer(server, { listen: { port } });
  console.log(`🚀 Server ready at ${url}`);
})();