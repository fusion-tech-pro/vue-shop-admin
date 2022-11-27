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
    getShopById: (state: ShopStore) => {
      return (shopId: number) =>
        state.shops?.find((shop) => shop.id === shopId);
    },
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
    changeShop(data: Shop) {
      const changedShop = this.shops!.map((shop) => {
        if (shop.id === data.id) {
          return {
            ...shop,
            logo: data.logo,
            coverImage: data.coverImage,
            name: data.name,
            ownerName: data.ownerName,
            webSite: data.webSite,
            socialLink: data.socialLink,
            description: data.description,
            country: data.country,
            state: data.state,
            city: data.city,
            street: data.street,
            zipCode: data.zipCode,
            telephoneNumber: data.telephoneNumber,
            totalProducts: data.totalProducts,
            totalOrders: data.totalOrders,
            dateOfRegistration: data.dateOfRegistration,
            id: data.id,
            status: data.status,
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
    changeStatusShop(id: number) {
      let newStatus;
      const filteredShops = this.shops!.map((shop) => {
        newStatus = shop.status === "active" ? "inactive" : "active";
        if (shop.id === id) {
          return {
            ...shop,
            status: newStatus,
          };
        }
        return shop;
      });

      this.shops = filteredShops;
    },
  },
});
