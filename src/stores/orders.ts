import type { Order } from "@/core/models/Order";
import type { Pagination } from "@/data/dto/OrdersResponse";
import { orderSource } from "@/data/orderSource";
import { defineStore } from "pinia";
import router from "@/core/router";

interface OrderState {
  orders: Array<Order> | undefined;
  order: Order | undefined;
  pagination: Pagination;
  loading: boolean;
  error: string | undefined;
}

export const useOrdersStore = defineStore("orders", {
  state: (): OrderState => {
    return {
      orders: undefined,
      order: undefined,
      pagination: {
        sortBy: "",
        direction: "ASC",
        filter: "",
        count: 0,
        page: 1,
        rowsPerPage: 20,
      },
      loading: false,
      error: undefined,
    };
  },
  getters: {},
  actions: {
    async getOrders() {
      try {
        this.loading = true;
        this.error = undefined;
        const pag: Pagination = { ...this.pagination };
        pag.page = router.currentRoute.value.query.page
          ? +router.currentRoute.value.query.page
          : 1;
        pag.sortBy = router.currentRoute.value.query.sortBy
          ? router.currentRoute.value.query.sortBy + ""
          : "";
        pag.direction = router.currentRoute.value.query.direction
          ? "DESC"
          : "ASC";

        if (router.currentRoute.value.query.filter) {
          pag.filter = router.currentRoute.value.query.filter
            ? router.currentRoute.value.query.filter + ""
            : "";
        }

        const { orders, pagination } = await orderSource.getOrders(pag);
        if (pag.page !== pagination.page) {
          const query = Object.assign({}, router.currentRoute.value.query);
          delete query.page;
          await router.replace({ query });
        }
        this.orders = orders;
        this.pagination = pagination;
      } catch (err) {
        console.error("Error is: ", err);
        this.error = `${err}`;
      } finally {
        this.loading = false;
      }
    },

    async getOrder() {
      try {
        this.loading = true;
        this.error = undefined;
        const order = await orderSource.getOrder();
        this.order = order;
      } catch (err) {
        console.error("Error is: ", err);
        this.error = `${err}`;
      } finally {
        this.loading = false;
      }
    },
  },
});
