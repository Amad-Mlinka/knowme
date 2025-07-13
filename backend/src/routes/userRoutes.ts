import { FastifyInstance } from 'fastify';
import { userController } from '../controllers/userController';

const userBodySchema = {
  type: 'object',
  properties: {
    username: { type: 'string' },
    email: { type: 'string', format: 'email' },
    password: { type: 'string', minLength: 6 },
    roleId: { type: 'integer', minimum: 1 },
  },
  required: ['username', 'email', 'password'],
};

export async function userRoutes(server: FastifyInstance) {
  server.get(
    '/users',
    {
      schema: {
        querystring: {
          type: 'object',
          properties: {
            page: { type: 'integer', minimum: 1 },
            limit: { type: 'integer', minimum: 1, maximum: 100 },
          },
        },
        tags: ['users'],
        description: 'List users with pagination',
      },
    },
    userController.list
  );

  server.get(
    '/users/:id',
    {
      schema: {
        params: {
          type: 'object',
          properties: { id: { type: 'integer' } },
          required: ['id'],
        },
        tags: ['users'],
        description: 'Get single user',
      },
    },
    userController.get
  );

  server.post(
    '/users',
    {
      schema: {
        body: userBodySchema,
        tags: ['users'],
        description: 'Create new user',
      },
    },
    userController.create
  );

  server.put(
    '/users/:id',
    {
      schema: {
        params: {
          type: 'object',
          properties: { id: { type: 'integer' } },
          required: ['id'],
        },
        body: {
          type: 'object',
          properties: {
            username: { type: 'string' },
            email: { type: 'string', format: 'email' },
            password: { type: 'string', minLength: 6 },
            roleId: { type: 'integer', minimum: 1 },
          },
        },
        tags: ['users'],
        description: 'Update user',
      },
    },
    userController.update
  );

  server.delete(
    '/users/:id',
    {
      schema: {
        params: {
          type: 'object',
          properties: { id: { type: 'integer' } },
          required: ['id'],
        },
        tags: ['users'],
        description: 'Delete user',
      },
    },
    userController.remove
  );
} 