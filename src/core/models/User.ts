import type { UserResponse } from "@/data/dto/UserResponse";

export class User {
  id: number;
  userName: string;
  email: string | undefined;
  avatar: string | undefined;
  userBio: string | undefined;
  contactNumber: string | undefined;

  constructor(options: {
    id: number;
    userName: string;
    email?: string;
    avatar?: string;
    userBio?: string;
    contactNumber?: string;
  }) {
    this.id = options.id;
    this.userName = options.userName;
    this.email = options.email;
    this.avatar = options.avatar;
    this.userBio = options.userBio;
    this.contactNumber = options.contactNumber;
  }

  static fromUserDto(userResponse: UserResponse): User {
    return new User({
      id: userResponse.id,
      userName: userResponse.user_name,
      email: userResponse.email,
      avatar: userResponse.avatar,
      userBio: userResponse.user_bio,
      contactNumber: userResponse.contact_number,
    });
  }
}
