import { sleep } from "@/utils/common";
import { User } from "@/core/models/User";
import type { UserResponse } from "../dto/UserResponse";

const mockImageURL =
  "https://st4.depositphotos.com/4329009/19956/v/450/depositphotos_199564354-stock-illustration-creative-vector-illustration-of-default.jpg";
class UsersSource {
  async getUsers() {
    await sleep(0.4);
    const response: UserResponse[] = [
      {
        id: 1,
        avatar: "https://cdn.quasar.dev/app-icons/icon-128x128.png",
        first_name: "user1",
        last_name: "Petrov",
        phone: "(123) 456 - 7890",
        password: "111111",
        email: "user1@mail.com",
        created_at: 1630037978762,
      },
      {
        id: 2,
        avatar: "https://cdn.quasar.dev/app-icons/icon-128x128.png",
        first_name: "user2",
        last_name: "Petrov",
        phone: "(123) 456 - 7890",
        password: "111111",
        email: "user2@mail.com",
        created_at: 1609037971762,
      },
      {
        id: 3,
        avatar: "https://cdn.quasar.dev/img/avatar.png",
        first_name: "user3",
        last_name: "Petrov",
        phone: "(123) 456 - 7890",
        password: "111111",
        email: "user3@mail.com",
        created_at: 1661107978762,
      },
      {
        id: 4,
        first_name: "user4",
        last_name: "Petrov",
        phone: "(123) 456 - 7890",
        password: "111111",
        email: "user4@mail.com",
        avatar: mockImageURL,
        created_at: 1660007978762,
      },
      {
        id: 5,
        first_name: "user5",
        email: "user5@mail.com",
        password: "222222",
        avatar: mockImageURL,
      },
      {
        id: 6,
        first_name: "user6",
        password: "222222",
        email: "user6@mail.com",
        avatar: mockImageURL,
      },
      {
        id: 7,
        first_name: "user7",
        password: "333333",
        email: "user7@mail.com",
      },
      {
        id: 8,
        first_name: "user8",
        last_name: "Userovich",
        password: "555555",
        email: "user8@mail.com",
        created_at: 1639137978762,
      },
      {
        id: 9,
        first_name: "user9",
        password: "123456",
        phone: "(123) 456 - 7890",
        email: "user9@mail.com",
      },
      {
        id: 10,
        first_name: "user10",
        password: "123456",
        email: "user10@mail.com",
      },
    ];

    return response.map(User.fromUserDto);
  }
}

export const usersSource = new UsersSource();
