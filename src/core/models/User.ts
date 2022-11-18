import type { UserResponse } from "@/data/dto/UserResponse";

export class User {
  id: number;
  username: string;
  email: string | undefined;
  avatar: string | undefined;
  userbio: string | undefined;
  contactnumber: string | undefined;

  constructor(options: {
    id: number;
    username: string;
    email?: string;
    avatar?: string;
    userbio?: string;
    contactnumber?: string;
  }) {
    this.id = options.id;
    this.username = options.username;
    this.email = options.email;
    this.avatar = options.avatar;
    this.userbio = options.userbio;
    this.contactnumber = options.contactnumber;
  }

  static fromUserDto(userResponse: UserResponse): User {
    return new User({
      id: userResponse.id,
      username: userResponse.user_name,
      email: userResponse.email,
      avatar: userResponse.avatar,
      userbio: userResponse.user_bio,
      contactnumber: userResponse.contact_number,
    });
  }
}
