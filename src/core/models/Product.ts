import type { ProductsResponse } from "@/data/dto/ProductsResponse";

export class Product {
  image?: string;
  name: string;
  group?: string;
  shop?: string;
  product_type?: string;
  price?: number;
  quantity?: number;
  status?: string;
  updated_at: string;
  created_at: string;
  id: number;

  constructor(options: {
    image?: string;
    name: string;
    group?: string;
    shop?: string;
    product_type?: string;
    price?: number;
    quantity?: number;
    status?: string;
    updated_at?: string;
    created_at?: string;
    id: number;
  }) {
    this.image = options.image;
    this.name = options.name;
    this.group = options.group;
    this.shop = options.shop;
    this.product_type = options.product_type;
    this.price = options.price;
    this.quantity = options.quantity;
    this.status = options.status;
    this.updated_at = options.updated_at;
    this.created_at = options.created_at;
    this.id = options.id;
  }

  static fromProductDto(ProductsResponse: ProductsResponse[]): Array<Product> {
    return ProductsResponse.map((product: Product) => {
      return new Product({
        image: product.image,
        name: product.name,
        group: product.group,
        shop: product.shop,
        product_type: product.product_type,
        price: product.price,
        quantity: product.quantity,
        status: product.status,
        created_at: product.created_at,
        updated_at: product.updated_at,
        id: product.id,
      });
    });
  }
}
