import { FastifyError, FastifyReply, FastifyRequest, FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';
import { ResponseStatus } from '../interfaces/response';

function errorHandler(
  instance: FastifyInstance,
  _opts: unknown,
  done: () => void
) {
  instance.setErrorHandler(
    (error: FastifyError, _request: FastifyRequest, reply: FastifyReply) => {
      const statusCode = error.statusCode || 500;
      instance.log.error(error);
      reply.status(statusCode).send({
        success: ResponseStatus.ERROR,
        message: error.message,
        code: statusCode,
      });
    }
  );
  done();
}

export default fp(errorHandler); 