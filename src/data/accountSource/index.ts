import { sleep } from "@/utils/common";
import { User } from "@/core/models/User";
import type { UserResponse } from "../dto/UserResponse";
import type { MainInfoFormState } from "@/pages/profile/entities";

class AccountSource {
  async login(
    username: string,
    password: string
  ): Promise<{
    user: User;
    token: string;
  }> {
    await sleep(0.2);
    const response = {
      user: {
        id: 1,
        user_name: "user",
        avatar: "https://cdn.quasar.dev/img/avatar.png",
        email: "user@test.com",
        contact_number: "1122334455",
        created_at: "n/a",
        updated_at: "n/a",
      },
      token: "qwe.user@test.com.user.qwe",
    };

    return {
      user: User.fromUserDto(response.user),
      token: response.token,
    };
  }

  async getMe(): Promise<User> {
    await sleep(0.2);
    const response: UserResponse = {
      id: 1,
      user_name: "user",
      avatar: "https://cdn.quasar.dev/img/avatar.png",
      email: "user@test.com",
      contact_number: "1122334455",
      created_at: "n/a",
      updated_at: "n/a",
    };

    return User.fromUserDto(response);
  }

  async changePassword(
    oldPassword: string,
    newPassword: string
  ): Promise<User> {
    await sleep(0.2);
    const response: UserResponse = {
      id: 1,
      user_name: "user",
      avatar: "https://cdn.quasar.dev/img/avatar.png",
      email: "user@test.com",
      contact_number: "1122334455",
      created_at: "n/a",
      updated_at: "n/a",
    };

    return User.fromUserDto(response);
  }

  async changeMainInfo(values: MainInfoFormState): Promise<User> {
    const { avatar, userName, email, userBio, contactNumber } = values;
    await sleep(0.2);
    const response: UserResponse = {
      id: 1,
      user_name: userName || "user",
      avatar,
      email: email || "user@test.com",
      user_bio: userBio,
      contact_number: contactNumber || "1122334455",
      created_at: "n/a",
      updated_at: "n/a",
    };

    return User.fromUserDto(response);
  }
}

export const accountSource = new AccountSource();
