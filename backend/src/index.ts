import Fastify from "fastify";
import cors from '@fastify/cors';

(async () => {
  const server = Fastify({ logger: true });
  server.register(cors);


  server.get("/hello", async () => {
    return { hello: "world" };
  });

  try {
    await server.listen({ port: 3000, host: '0.0.0.0' });
    console.log('Server is running on http://localhost:3000');
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
})();
