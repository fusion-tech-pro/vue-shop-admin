import type { Order } from "@/core/models/Order";
import { orderSource } from "@/data/orderSource";
import { defineStore } from "pinia";

interface OrderState {
  orders: Array<Order> | undefined;
  order: Order | undefined;
  pagination: Object | undefined;
  loading: boolean;
  error: string | undefined;
}

export const useOrdersStore = defineStore("orders", {
  state: (): OrderState => {
    return {
      orders: undefined,
      order: undefined,
      pagination: undefined,
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
        const { orders, pagination } = await orderSource.getOrders();
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
