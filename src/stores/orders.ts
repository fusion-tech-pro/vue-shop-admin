import type { Order } from "@/core/models/Order";
import type { Pagination } from "@/data/dto/OrdersResponse";
import { orderSource } from "@/data/orderSource";
import { defineStore } from "pinia";

interface OrderState {
  orders?: Array<Order>;
  order?: Order;
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
    async getOrders(newPagination: Pagination) {
      try {
        this.loading = true;
        this.error = undefined;

        const { orders, pagination } = await orderSource.getOrders(
          newPagination
        );
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
