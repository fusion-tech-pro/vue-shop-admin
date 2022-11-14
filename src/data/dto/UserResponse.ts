// this is just an example of user DTO, it's not requried to do make it the same on the server

export interface UserResponse {
  id: number;
  user_name: string;
  updated_at: string;
  created_at: string;

  email?: string;
}
