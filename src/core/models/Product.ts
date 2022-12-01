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

  static fromProductDto(ProductsResponse: ProductsResponse[]): Array<Product> {
    return ProductsResponse.map((product: ProductsResponse) => {
      return new Product({
        image: product.image,
        name: product.name,
        group: product.group,
        shop: product.shop,
        productType: product.product_type,
        price: product.price,
        quantity: product.quantity,
        status: product.status,
        createdAt: product.created_at,
        updatedAt: product.updated_at,
        id: product.id,
      });
    });
  }
}
