export type LoginField = {
  identifier: string;
  password: string;
};

export type RegisterField = {
  fullName: string;
  email: string;
  password: string;
  retypePassword: string;
};

export type RegisterData = RegisterField & { username: string };
