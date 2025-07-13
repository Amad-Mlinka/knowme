import Fastify from 'fastify';
import swagger from '@fastify/swagger';
import swaggerUI from '@fastify/swagger-ui';
import { env } from './config/env';
import errorHandler from './middleware/errorHandler';
import { userRoutes } from './routes/userRoutes';
import dbPlugin from './config/db';

export function buildServer() {
  const server = Fastify({
    logger: {
      level: env.NODE_ENV === 'production' ? 'info' : 'debug',
    },
  });

  // Register Swagger (OpenAPI) specification and UI
  server.register(swagger, {
    openapi: {
      info: {
        title: 'KnowMe API',
        description: 'API documentation',
        version: '1.0.0',
      },
    },
  });

  server.register(swaggerUI, {
    routePrefix: '/docs',
  });

  // Database connection
  server.register(dbPlugin);

  server.register(errorHandler);

  server.register(userRoutes, { prefix: '/api/v1' });

  return server;
} 