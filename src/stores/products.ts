import type { Product } from "@/core/models/Product";
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
    getProducts: (state: ProductStore): Array<Product> =>
      state.products as Product[],
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
      const changedProducts = this.products!.map((product) => {
        if (product.id === data.id) {
          return {
            ...product,
            image: data.image,
            name: data.name,
            group: data.group,
            shop: data.shop,
            productType: data.productType,
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
    removeProduct(id: number) {
      const filteredProducts = this.products!.filter(
        (product) => product.id !== id
      );
      this.products = filteredProducts;
    },
  },
});
