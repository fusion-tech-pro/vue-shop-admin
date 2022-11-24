export interface EdditUserType {
  id?: number;
  firstName: string;
  lastName?: string;
  password: string;
  phone?: string;
  email: string;
  avatar?: string;
  createAt?: string;
  passwordConfirmation?: string;
}

export type FormTypeUser = {
  firstName: string;
  lastName?: string;
  password: string;
  phone?: string;
  email: string;
  passwordConfirmation?: string;
};
