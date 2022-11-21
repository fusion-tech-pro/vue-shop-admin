import { sleep } from "@/utils/common";
import { Product } from "@/core/models/Product";
import type { ProductsResponse } from "../dto/ProductsResponse";

class ProductsSource {
  async getProducts(): Promise<ProductsResponse[]> {
    await sleep(0.4);
    const response: ProductsResponse[] = [
      {
        image: "",
        name: "Green Beans",
        group: "Grocery",
        shop: "Grocery Shop",
        product_type: "simple",
        price: 35,
        quantity: 50,
        status: "publish",
        created_at: "n/a",
        updated_at: "n/a",
        id: 1,
      },
      {
        image: "",
        name: "Raymond",
        group: "Clothing",
        shop: "Clothing Shop",
        product_type: "simple",
        price: 100,
        quantity: 50,
        status: "publish",
        created_at: "n/a",
        updated_at: "n/a",
        id: 2,
      },
      {
        image: "",
        name: "Golders",
        group: "Clothing",
        shop: "Clothing Shop",
        product_type: "simple",
        price: 75,
        quantity: 50,
        status: "publish",
        created_at: "n/a",
        updated_at: "n/a",
        id: 3,
      },
      {
        image: "",
        name: "Givenchy Purse",
        group: "Bags",
        shop: "Bags Shop",
        product_type: "simple",
        price: 200,
        quantity: 50,
        status: "publish",
        created_at: "n/a",
        updated_at: "n/a",
        id: 4,
      },
      {
        image: "",
        name: "Gucci Purse",
        group: "Bags",
        shop: "Bags Shop",
        product_type: "simple",
        price: 250,
        quantity: 50,
        status: "publish",
        created_at: "n/a",
        updated_at: "n/a",
        id: 5,
      },
      {
        image: "",
        name: "Apples",
        group: "Grocery",
        shop: "Grocery Shop",
        product_type: "simple",
        price: 10,
        quantity: 50,
        status: "publish",
        created_at: "n/a",
        updated_at: "n/a",
        id: 6,
      },
      {
        image: "",
        name: "Lollipop",
        group: "Grocery",
        shop: "Grocery Shop",
        product_type: "simple",
        price: 3,
        quantity: 50,
        status: "publish",
        created_at: "n/a",
        updated_at: "n/a",
        id: 7,
      },
      {
        image: "",
        name: "Honeycomb",
        group: "Grocery",
        shop: "Grocery Shop",
        product_type: "simple",
        price: 20,
        quantity: 50,
        status: "publish",
        created_at: "n/a",
        updated_at: "n/a",
        id: 8,
      },
      {
        image: "",
        name: "Donut",
        group: "Grocery",
        shop: "Grocery Shop",
        product_type: "simple",
        price: 5,
        quantity: 50,
        status: "publish",
        created_at: "n/a",
        updated_at: "n/a",
        id: 9,
      },
      {
        image: "",
        name: "KitKat",
        group: "Grocery",
        shop: "Grocery Shop",
        product_type: "simple",
        price: 15,
        quantity: 50,
        status: "publish",
        created_at: "n/a",
        updated_at: "n/a",
        id: 10,
      },
    ];

    return Product.fromProductDto(response);
  }
}

export const productsSource = new ProductsSource();