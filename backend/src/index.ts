import Fastify from "fastify";
import 'reflect-metadata';
import cors from '@fastify/cors';
import { AppDataSource } from './data-source';
import * as dotenv from 'dotenv';

(async () => {
  // Load environment variables from .env file
  dotenv.config();

  // Initialize Fastify server
  const server = Fastify({ logger: true });

  // Register CORS
  server.register(cors);

  // Connect to the database
  AppDataSource.initialize().then(() => {
    console.log('Data Source has been initialized.');
  }).catch((err) => {
    console.error('Error during Data Source initialization:', err);
  });


  // Start the server
  try {
    const port = Number(process.env.PORT) || 3000;
    const host = process.env.HOST || '0.0.0.0';

    await server.listen({ port, host });
    console.log(`Server is running on http://${host}:${port}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
})();
