import type { UserResponse } from "@/data/dto/UserResponse";

export class User {
  id: number;
  firstName: string;
  lastName?: string;
  email: string;
  password: string;
  contactNumber?: string;
  avatar?: string;
  createAt?: string;
  userName?: string;
  userBio?: string;

  constructor(options: {
    id: number;
    firstName: string;
    lastName?: string;
    email: string;
    password: string;
    contactNumber?: string;
    avatar?: string;
    createAt?: string;
  }) {
    this.id = options.id;
    this.firstName = options.firstName;
    this.email = options.email;
    this.lastName = options.lastName;
    this.password = options.password;
    this.contactNumber = options.contactNumber;
    this.avatar = options.avatar;
    this.createAt = options.createAt;
  }

  static fromUserDto(userResponse: UserResponse): User {
    return new User({
      id: userResponse.id,
      firstName: userResponse.first_name ?? "",
      email: userResponse.email,
      lastName: userResponse.last_name ?? "",
      password: "111111",
      contactNumber: userResponse.contact_number,
      createAt: userResponse.created_at,
      avatar: userResponse.avatar,
    });
  }
}
