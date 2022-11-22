// this is just an example of user DTO, it's not requried to do make it the same on the server

export interface UserResponse {
  id: number;
  first_name: string;
  // updated_at: string;
  created_at?: number;
  last_name?: string;
  email: string;
  password: string;
  phone?: string;
  avatar?: string;
}
