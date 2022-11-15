import { useUserStore } from "@/stores/user";
import type { NavigationGuardWithThis } from "vue-router";

export const logoutGuard: NavigationGuardWithThis<unknown> = () => {
  const userStore = useUserStore();

  userStore.logout();
  return {
    name: "sign-in",
  };
};
