export interface Address {
  district: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface OrdersResponse {
  id: number;
  tracking_number: string;
  delivery_fee: number;
  total_price: number;
  order_date: Date;
  status: string;
  address: Address;
  children?: Array<OrdersResponse>;
  updated_at: string;
  created_at: string;
}

export interface Pagination {
  sortBy?: string;
  direction: "DESC" | "ASC";
  filter?: string;
  count: number;
  page: number;
  rowsPerPage: number;
}
