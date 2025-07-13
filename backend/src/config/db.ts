import fp from 'fastify-plugin';
import { env } from './env';
import { FastifyInstance } from 'fastify';
import fastifyPostgres from 'fastify-postgres';

export default fp(async function dbPlugin(server: FastifyInstance) {
  server.register(fastifyPostgres, {
    connectionString: env.DATABASE_URL,
    host: env.DB_HOST,
    port: env.DB_PORT,
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
  });
}); 