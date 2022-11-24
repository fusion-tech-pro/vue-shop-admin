import type { Shop } from "@/core/models/Shop";
import { shopsSource } from "@/data/shopsSource";
import { defineStore } from "pinia";

interface ShopStore {
  shops: Shop[] | null;
}

export const useShopsStore = defineStore("shops", {
  state: (): ShopStore => {
    return {
      shops: null,
    };
  },
  getters: {
    getShops: (state: ShopStore): Array<Shop> => state.shops as Shop[],
  },
  actions: {
    async fetchShops() {
      try {
        const shops = await shopsSource.getShops();
        this.shops = shops;
      } catch (err) {
        console.log("Error is:", err);
        this.shops = null;
      }
    },
    createShop(data: Shop) {
      const newArr = this.shops as Shop[];
      newArr.push(data);
      this.shops = newArr;
    },
    ChangeShop(data: Shop) {
      const changedShop = this.shops!.map((shop) => {
        if (shop.id === data.id) {
          return {
            ...shop,
          };
        }
        return shop;
      });
      this.shops = changedShop;
    },
    removeShop(id: number) {
      const filteredShops = this.shops!.filter((shop) => shop.id !== id);
      this.shops = filteredShops;
    },
  },
});
