import { buildServer } from '../../src/app';

const server = buildServer();

describe('User CRUD', () => {
  beforeAll(async () => {
    await server.ready();
  });

  afterAll(async () => {
    await server.close();
  });

  it('should perform a full CRUD cycle', async () => {
    // Create
    const createRes = await server.inject({
      method: 'POST',
      url: '/api/v1/users',
      payload: { name: 'John', email: 'john@example.com' },
    });
    expect(createRes.statusCode).toBe(201);
    const created = createRes.json();
    const id = created.data.id;

    // Read
    const getRes = await server.inject({ method: 'GET', url: `/api/v1/users/${id}` });
    expect(getRes.statusCode).toBe(200);

    // Update
    const updateRes = await server.inject({
      method: 'PUT',
      url: `/api/v1/users/${id}`,
      payload: { name: 'John Updated' },
    });
    expect(updateRes.statusCode).toBe(200);
    expect(updateRes.json().data.name).toBe('John Updated');

    // Delete
    const delRes = await server.inject({ method: 'DELETE', url: `/api/v1/users/${id}` });
    expect(delRes.statusCode).toBe(200);
  });
}); 