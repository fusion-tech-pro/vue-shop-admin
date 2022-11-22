export interface RowType {
  id?: number;
  firstName: string;
  lastName?: string;
  password: string;
  phone?: string;
  email: string;
  avatar?: string;
  createAt?: number;
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
