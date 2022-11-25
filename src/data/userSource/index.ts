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
        user_name: "",
        avatar: "https://cdn.quasar.dev/app-icons/icon-128x128.png",
        first_name: "user1",
        last_name: "Petrov",
        contact_number: "(123) 456 - 7890",
        email: "user1@mail.com",
        created_at: "05/08/2021, 07:19:38",
      },
      {
        id: 2,
        avatar: "https://cdn.quasar.dev/app-icons/icon-128x128.png",
        first_name: "user2",
        last_name: "Petrov",
        contact_number: "(123) 456 - 7890",
        email: "user2@mail.com",
        user_name: "",
        created_at: "07/18/2021, 07:19:38",
      },
      {
        id: 3,
        avatar: "https://cdn.quasar.dev/img/avatar.png",
        first_name: "user3",
        last_name: "Petrov",
        contact_number: "(123) 456 - 7890",
        user_name: "",
        email: "user3@mail.com",
        created_at: "07/17/2022, 07:19:38",
      },
      {
        id: 4,
        user_name: "",
        first_name: "user4",
        last_name: "Petrov",
        contact_number: "(123) 456 - 7890",
        email: "user4@mail.com",
        avatar: mockImageURL,
        created_at: "07/08/2022, 07:19:38",
      },
      {
        id: 5,
        user_name: "",
        first_name: "user5",
        email: "user5@mail.com",
        avatar: mockImageURL,
      },
      {
        id: 6,
        user_name: "",
        first_name: "user6",
        email: "user6@mail.com",
        avatar: mockImageURL,
      },
      {
        id: 7,
        user_name: "",
        first_name: "user7",
        email: "user7@mail.com",
      },
      {
        id: 8,
        user_name: "",
        first_name: "user8",
        last_name: "Userovich",
        email: "user8@mail.com",
        created_at: "11/11/2021, 07:19:38",
      },
      {
        id: 9,
        user_name: "",
        first_name: "user9",
        contact_number: "(123) 456 - 7890",
        email: "user9@mail.com",
      },
      {
        id: 10,
        user_name: "",
        first_name: "user10",
        email: "user10@mail.com",
      },
    ];

    return response.map(User.fromUserDto);
  }
}

export const usersSource = new UsersSource();
