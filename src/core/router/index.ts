import { createRouter, createWebHistory } from "vue-router";

import {
  authenticatedGuard,
  unauthenticatedGuard,
  logoutGuard,
} from "./guards";

const SignInPage = () => import("@/pages/signIn/SignInPage.vue");

const HomeView = () => import("@/pages/home/HomePage.vue");
const DashboardPage = () => import("@/pages/dashboard/DashboardPage.vue");
const UsersPage = () => import("@/pages/users/UsersPage.vue");
const ProductsPage = () => import("@/pages/products/ProductsPage.vue");
const EmptyView = () => import("@/pages/empty/EmptyView.vue");
const ProfilePage = () => import("@/pages/profile/ProfilePage.vue");

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      redirect: "/dashboard",
      beforeEnter: [authenticatedGuard],
      children: [
        {
          path: "/dashboard",
          component: DashboardPage,
          name: "dashboard",
        },
        {
          path: "/users",
          component: UsersPage,
          name: "users",
        },
        {
          path: "/products",
          component: ProductsPage,
          name: "products",
        },
        {
          path: "/profile",
          component: ProfilePage,
          name: "profile",
        },
      ],
    },
    {
      path: "/sign-in",
      name: "sign-in",
      component: SignInPage,
      beforeEnter: [unauthenticatedGuard],
    },
    {
      path: "/logout",
      name: "logout",
      component: EmptyView,
      beforeEnter: [logoutGuard],
    },
  ],
});

export default router;
