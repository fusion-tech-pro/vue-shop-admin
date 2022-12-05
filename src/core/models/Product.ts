import type { ProductsResponse } from "@/data/dto/ProductsResponse";

export class Product {
  image?: string;
  name: string;
  group?: string;
  shop?: string;
  productType?: string;
  price?: number;
  quantity?: number;
  status?: string;
  updatedAt?: string;
  createdAt?: string;
  id: number;

  constructor(options: {
    image?: string;
    name: string;
    group?: string;
    shop?: string;
    productType?: string;
    price?: number;
    quantity?: number;
    status?: string;
    updatedAt?: string;
    createdAt?: string;
    id: number;
  }) {
    this.image = options.image;
    this.name = options.name;
    this.group = options.group;
    this.shop = options.shop;
    this.productType = options.productType;
    this.price = options.price;
    this.quantity = options.quantity;
    this.status = options.status;
    this.updatedAt = options.updatedAt;
    this.createdAt = options.createdAt;
    this.id = options.id;
  }

  static fromProductDto(ProductsResponse: ProductsResponse): Product {
    return new Product({
      image: ProductsResponse.image,
      name: ProductsResponse.name,
      group: ProductsResponse.group,
      shop: ProductsResponse.shop,
      productType: ProductsResponse.product_type,
      price: ProductsResponse.price,
      quantity: ProductsResponse.quantity,
      status: ProductsResponse.status,
      createdAt: ProductsResponse.created_at,
      updatedAt: ProductsResponse.updated_at,
      id: ProductsResponse.id,
    });
  }
}
