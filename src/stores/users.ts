import { defineStore } from "pinia";
import { usersSource } from "@/data/userSource";
import type { User } from "@/core/models/User";
import type { EditUserType } from "@/pages/users/types";

interface UserStore {
  users: User[];
  indexOfEdit: number;
}
export const useUsers = defineStore("users", {
  state: (): UserStore => {
    return {
      users: [],
      indexOfEdit: 0,
    };
  },

  getters: {
    getUsers: (state: UserStore): Array<User> => state.users as User[],
  },

  actions: {
    async fetchUsers() {
      try {
        const users = await usersSource.getUsers();
        this.users = users;
      } catch (err) {
        console.log("Error is:", err);
        this.users = [];
      }
    },

    removeUser(user: User) {
      if (user && this.users) {
        this.users.splice(this.users.indexOf(user), 1);
      }
    },

    updateUser(user: EditUserType) {
      if (!this.users) {
        return;
      }
      this.users[this.indexOfEdit] = {
        ...this.users[this.indexOfEdit],
        ...user,
      };
    },

    addUser(user: User) {
      if (!user) {
        return;
      }
      this.users.push(user);
    },
  },
});
