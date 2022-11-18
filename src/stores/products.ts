import type { Product } from "@/core/models/product";
import { productsSource } from "@/data/productsSource";
import { defineStore } from "pinia";

interface ProductStore {
  products: Product[] | null;
}

export const useProductsStore = defineStore("products", {
  state: (): ProductStore => {
    return {
      products: null,
    };
  },
  getters: {
    getProducts: (state: ProductStore): Array<Product> => {
      return state.products;
    },
  },
  actions: {
    async fetchProducts() {
      try {
        const products = await productsSource.getProducts();
        this.products = products;
      } catch (err) {
        console.log("Error is:", err);
        this.products = null;
      }
    },
    addNewProduct(data: Product) {
      // TODO Need change to call API request when it will be done
      const newArr = this.products as Product[];
      newArr.push(data);
      this.products = newArr;
    },
    changeProduct(data: Product) {
      const changedProducts = this.products.map((product) => {
        if (product.id === data.id) {
          return {
            ...product,
            image: data.image,
            name: data.name,
            group: data.group,
            shop: data.shop,
            product_type: data.product_type,
            price: data.price,
            quantity: data.quantity,
            status: data.status,
            id: data.id,
          };
        }
        return product;
      });
      this.products = changedProducts;
    },
  },
});
