export interface User {
  id: string;
  name: string;
  email: string;
}

let users: User[] = [];

export const UserModel = {
  findAll: () => users,
  findById: (id: string) => users.find((u) => u.id === id),
  create: (user: User) => {
    users.push(user);
    return user;
  },
  update: (id: string, attrs: Partial<Omit<User, 'id'>>) => {
    const index = users.findIndex((u) => u.id === id);
    if (index === -1) return null;
    users[index] = { ...users[index], ...attrs };
    return users[index];
  },
  remove: (id: string) => {
    const index = users.findIndex((u) => u.id === id);
    if (index === -1) return null;
    const [removed] = users.splice(index, 1);
    return removed;
  },
  reset: () => {
    users = [];
  },
}; 