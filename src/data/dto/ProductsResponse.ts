export interface ProductsResponse {
  products: Product[];
}

export type Product = {
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
};
