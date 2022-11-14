import type { User } from "@/core/models/User";
import { accountSource } from "@/data/accountSource";
import { tokenSource } from "@/data/tokenSource";
import { defineStore } from "pinia";

interface UserState {
  user: User | null;
  initialized: boolean;
  loading: boolean;
  error: string | null;
}

export const useUserStore = defineStore("user", {
  state: (): UserState => {
    return {
      user: null,
      initialized: false,
      loading: false,
      error: null,
    };
  },
  getters: {
    authenticated: (state: UserState): boolean => {
      return !!state.user;
    },
  },
  actions: {
    async login(username: string, password: string) {
      try {
        this.loading = true;
        this.error = null;
        const user = await accountSource.login(username, password);
        this.user = user;
      } catch (err) {
        console.error("Error is: ", err);
        this.error = `${err}`;
      } finally {
        this.loading = false;
      }
    },

    async initializeUser() {
      try {
        // const user = await accountSource.getMe();
        // this.user = user;
        this.error = null;
        this.user = null;
      } catch (err) {
        console.error("Error:", err);
        tokenSource.clearStorage();
        this.user = null;
        this.error = "User initialization error";
      } finally {
        this.initialized = true;
      }
    },

    logout() {
      tokenSource.clearStorage();
      this.user = null;
    },
  },
});
