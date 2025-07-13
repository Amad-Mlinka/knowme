import { buildServer } from './app';
import { env } from './config/env';

const server = buildServer();

const start = async () => {
  try {
    await server.listen({ port: env.PORT, host: '0.0.0.0' });
    server.log.info(`Server running at http://localhost:${env.PORT}`);
    server.log.info(`Swagger docs at http://localhost:${env.PORT}/docs`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start(); 