import { defineStore } from "pinia";
import { rows } from "../pages/users/assetsData/usersData";
import type { RowType } from "../pages/users/types";

export const useUsersStore = defineStore("rows", {
  state: () => {
    return {
      rows: rows as RowType[],
      indexOfEdit: 0,
    };
  },

  getters: {},

  actions: {
    removeUser(user: RowType) {
      if (user) {
        this.rows.splice(this.rows.indexOf(user), 1);
      }
    },

    updateUser(user: RowType) {
      this.rows[this.indexOfEdit] = {
        ...this.rows[this.indexOfEdit],
        ...user,
      };
    },

    addUser(user: RowType) {
      if (!user) {
        return;
      }
      this.rows.push(user);
    },
  },
});
