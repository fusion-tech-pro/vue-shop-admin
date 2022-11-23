import type { UserResponse } from "@/data/dto/UserResponse";

export class User {
  id: number;
  firstName: string;
  lastName?: string;
  email: string;
  password: string;
  phone?: string;
  avatar?: string;
  createAt?: number;

  constructor(options: {
    id: number;
    firstName: string;
    lastName?: string;
    email: string;
    password: string;
    phone?: string;
    avatar?: string;
    createAt?: number;
  }) {
    this.id = options.id;
    this.firstName = options.firstName;
    this.email = options.email;
    this.lastName = options.lastName;
    this.password = options.password;
    this.phone = options.phone;
    this.avatar = options.avatar;
    this.createAt = options.createAt;
  }

  static fromUserDto(userResponse: UserResponse): User {
    return new User({
      id: userResponse.id,
      firstName: userResponse.first_name,
      email: userResponse.email,
      lastName: userResponse.last_name ?? "",
      password: userResponse.password,
      phone: userResponse.phone,
      createAt: userResponse.created_at,
      avatar: userResponse.avatar,
    });
  }
}
