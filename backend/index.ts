import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import connectDB from "./config/db";
import typeDefs from "./graphql/schema/index";
import resolver from "./graphql/resolvers/index";

(async function startServer() {
  try {
    await connectDB();

    const server = new ApolloServer({
      typeDefs,
      resolvers: resolver,
      introspection: true,
    });

    const port = Number(process.env.PORT) || 5000;

    const { url } = await startStandaloneServer(server, {
      listen: { port, host: '0.0.0.0' },
      context: async ({ req }) => {
        return { req };
      },
    });

    console.log(`🚀 Server ready at ${url}`);
  } catch (error) {
    console.error("❌ Server failed to start:", error);
  }
})();
