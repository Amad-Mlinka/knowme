import { Pool } from 'pg';

export interface DBUser {
  user_id: number;
  username: string;
  email: string;
  password_hash: string;
  role_id: number | null;
  associated_site_id: number | null;
}

export const userService = {
  async list(pg: Pool, page: number, limit: number) {
    const offset = (page - 1) * limit;
    const totalRes = await pg.query<{ count: string }>('SELECT COUNT(*) FROM users');
    const { rows } = await pg.query<DBUser>('SELECT * FROM users ORDER BY user_id LIMIT $1 OFFSET $2', [
      limit,
      offset,
    ]);
    const total = Number(totalRes.rows[0].count);
    return {
      items: rows,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  },

  async get(pg: Pool, id: number) {
    const { rows } = await pg.query<DBUser>('SELECT * FROM users WHERE user_id = $1', [id]);
    return rows[0];
  },

  async create(
    pg: Pool,
    data: { username: string; email: string; password: string; roleId?: number | null }
  ) {
    const { username, email, password, roleId = null } = data;
    const passwordHash = password; // TODO: hash
    const { rows } = await pg.query<DBUser>(
      'INSERT INTO users (username, email, password_hash, role_id) VALUES ($1, $2, $3, $4) RETURNING *',
      [username, email, passwordHash, roleId]
    );
    return rows[0];
  },

  async update(
    pg: Pool,
    id: number,
    data: { username?: string; email?: string; password?: string; roleId?: number | null }
  ) {
    const existing = await this.get(pg, id);
    if (!existing) return null;

    const {
      username = existing.username,
      email = existing.email,
      password_hash = existing.password_hash,
      role_id = existing.role_id,
    } = {
      username: data.username ?? existing.username,
      email: data.email ?? existing.email,
      password_hash: data.password ? data.password : existing.password_hash,
      role_id: data.roleId ?? existing.role_id,
    };

    const { rows } = await pg.query<DBUser>(
      'UPDATE users SET username=$1, email=$2, password_hash=$3, role_id=$4 WHERE user_id=$5 RETURNING *',
      [username, email, password_hash, role_id, id]
    );
    return rows[0];
  },

  async delete(pg: Pool, id: number) {
    const { rows } = await pg.query<DBUser>('DELETE FROM users WHERE user_id=$1 RETURNING *', [id]);
    return rows[0];
  },
}; 