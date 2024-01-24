import Users from "#examples/users.json" with { type: "json" };

export type User = {
  id: number;
  name: string;
};

export const fetchUsers = async (): Promise<User[]> => {
  const res = JSON.stringify(Users);

  return await JSON.parse(res);
};
