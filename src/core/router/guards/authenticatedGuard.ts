import { useUserStore } from "@/stores/user";
import type { NavigationGuardWithThis } from "vue-router";

export const authenticatedGuard: NavigationGuardWithThis<unknown> = () => {
  const userStore = useUserStore();

  if (!userStore.authenticated) {
    return {
      name: "sign-in",
    };
  }
};
