import { useUserStore } from "@/stores/user";
import type { NavigationGuardWithThis } from "vue-router";

export const unauthenticatedGuard: NavigationGuardWithThis<unknown> = () => {
  const userStore = useUserStore();
  if (userStore.authenticated) {
    return {
      name: "home",
    };
  }
};
