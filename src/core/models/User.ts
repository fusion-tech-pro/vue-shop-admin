import type { UserResponse } from "@/data/dto/UserResponse";

export class User {
  id: number;
  username: string;
  email: string | undefined;

  constructor(options: { id: number; username: string; email?: string }) {
    this.id = options.id;
    this.username = options.username;
    this.email = options.email;
  }

  static fromUserDto(userResponse: UserResponse): User {
    return new User({
      id: userResponse.id,
      username: userResponse.user_name,
      email: userResponse.email,
    });
  }
}
