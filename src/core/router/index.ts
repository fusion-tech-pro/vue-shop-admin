import { createRouter, createWebHistory } from "vue-router";

import {
  authenticatedGuard,
  unauthenticatedGuard,
  logoutGuard,
} from "./guards";

const SignInPage = () => import("@/pages/signIn/SignInPage.vue");

const HomeView = () => import("@/pages/home/HomePage.vue");
const ShopsPage = () => import("@/pages/shops/ShopsPage.vue");
const DashboardPage = () => import("@/pages/dashboard/DashboardPage.vue");
const UsersPage = () => import("@/pages/users/UsersPage.vue");
const ProductsPage = () => import("@/pages/products/ProductsPage.vue");
const EmptyView = () => import("@/pages/empty/EmptyView.vue");
const ShopView = () => import("@/pages/shop/Shop.vue");

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
          path: "/shops",
          component: ShopsPage,
          name: "shops",
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
          path: "/shop/:name/:id",
          component: ShopView,
          name: "shop",
          props: true,
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
