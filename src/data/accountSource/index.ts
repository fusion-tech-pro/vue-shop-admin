import { sleep } from "@/utils/common";
import { User } from "@/core/models/User";
import type { UserResponse } from "../dto/UserResponse";

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
        email: "user@test.com",
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
      email: "user@test.com",
      created_at: "n/a",
      updated_at: "n/a",
    };

    return User.fromUserDto(response);
  }
}

export const accountSource = new AccountSource();
