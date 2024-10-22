import Fastify from "fastify";
import cors from '@fastify/cors';
import wineRoutes from './routes/wine';

(async () => {
  const server = Fastify({ logger: true });
  server.register(cors);


  server.get("/hello", async () => {
    return { hello: "world" };
  });

  wineRoutes(server);


  try {
    await server.listen({ port: 3000, host: '0.0.0.0' });
    console.log('Server is running on http://localhost:3000');
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
})();
