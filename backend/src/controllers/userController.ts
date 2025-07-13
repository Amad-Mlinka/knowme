import { FastifyReply } from 'fastify';
import { ResponseStatus } from '../interfaces/response';
import { userService } from '../services/userService';

export const userController = {
  async list(
    req: any,
    reply: FastifyReply
  ) {
    const { page = 1, limit = 10 } = req.query;
    const pg = (req.server as any).pg;
    const listData = await userService.list(pg, Number(page), Number(limit));
    reply.send({
      success: ResponseStatus.SUCCESS,
      message: 'Users fetched',
      data: listData,
    });
  },

  async get(
    req: any,
    reply: FastifyReply
  ) {
    const pg = (req.server as any).pg;
    const user = await userService.get(pg, Number(req.params.id));
    if (!user) {
      reply.code(404).send({
        success: ResponseStatus.ERROR,
        message: 'User not found',
        code: 404,
      });
      return;
    }
    reply.send({
      success: ResponseStatus.SUCCESS,
      message: 'User fetched',
      data: user,
    });
  },

  async create(
    req: any,
    reply: FastifyReply
  ) {
    const pg = (req.server as any).pg;
    const user = await userService.create(pg, req.body);
    reply.code(201).send({
      success: ResponseStatus.SUCCESS,
      message: 'User created',
      data: user,
    });
  },

  async update(
    req: any,
    reply: FastifyReply
  ) {
    const pg = (req.server as any).pg;
    const updated = await userService.update(pg, Number(req.params.id), req.body);
    if (!updated) {
      reply.code(404).send({
        success: ResponseStatus.ERROR,
        message: 'User not found',
        code: 404,
      });
      return;
    }
    reply.send({
      success: ResponseStatus.SUCCESS,
      message: 'User updated',
      data: updated,
    });
  },

  async remove(
    req: any,
    reply: FastifyReply
  ) {
    const pg = (req.server as any).pg;
    const removed = await userService.delete(pg, Number(req.params.id));
    if (!removed) {
      reply.code(404).send({
        success: ResponseStatus.ERROR,
        message: 'User not found',
        code: 404,
      });
      return;
    }
    reply.send({
      success: ResponseStatus.SUCCESS,
      message: 'User deleted',
      data: removed,
    });
  },
}; 