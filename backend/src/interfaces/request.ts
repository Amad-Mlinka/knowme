import { FastifyRequest } from 'fastify';

export interface BaseRequest<Options = unknown> extends FastifyRequest<Options> {
  // Shared properties for all requests (e.g., authenticated user)
  user?: {
    id: string;
    email: string;
  };
} 