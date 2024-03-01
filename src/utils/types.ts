export type CreateUserParams = {
  name: string;
  email: string;
  password: string;
//   confirmPassword: string;
  role: 'INTERN' | 'ENGINEER' | 'ADMIN';
};
