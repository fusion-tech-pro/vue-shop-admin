import { sleep } from "@/utils/common";
import { Order } from "@/core/models/Order";
import type { OrdersResponse, Pagination } from "../dto/OrdersResponse";

const defaultOrders: Array<OrdersResponse> = [
  {
    id: 1,
    tracking_number: "CGG82oQZc4i8",
    delivery_fee: 50.0,
    total_price: 1641.2,
    order_date: new Date("11.11.22"),
    status: "Order Received",
    address: {
      district: "2148 Stratford Park",
      city: "Winchester",
      state: "KY",
      zipCode: "40391",
      country: "United States",
    },
    updated_at: "n/a",
    created_at: "n/a",
    children: [
      {
        id: 2,
        tracking_number: "CGG82oQZc4i8",
        delivery_fee: 0.0,
        total_price: 49.2,
        order_date: new Date("09.20.21"),
        status: "Order Received",
        address: {
          district: "2148 Stratford Park",
          city: "Winchester",
          state: "KY",
          zipCode: "40391",
          country: "United States",
        },
        updated_at: "n/a",
        created_at: "n/a",
      },
      {
        id: 3,
        tracking_number: "CGG82oQZc4i8",
        delivery_fee: 5.0,
        total_price: 1.2,
        order_date: new Date("11.05.19"),
        status: "Order Received",
        address: {
          district: "2148 Stratford Park",
          city: "Winchester",
          state: "KY",
          zipCode: "40391",
          country: "United States",
        },
        updated_at: "n/a",
        created_at: "n/a",
      },
      {
        id: 4,
        tracking_number: "CGG82oQZc4i8",
        delivery_fee: 4.2,
        total_price: 16.2,
        order_date: new Date("05.11.19"),
        status: "Order Received",
        address: {
          district: "2148 Stratford Park",
          city: "Winchester",
          state: "KY",
          zipCode: "40391",
          country: "United States",
        },
        updated_at: "n/a",
        created_at: "n/a",
      },
    ],
  },
  {
    id: 5,
    tracking_number: "rh3Az9KeBi2j",
    delivery_fee: 50.0,
    total_price: 1641.2,
    order_date: new Date("11.20.17"),
    status: "Order Sent",
    address: {
      district: "2148 Stratford Park",
      city: "Winchester",
      state: "KY",
      zipCode: "40391",
      country: "United States",
    },
    updated_at: "n/a",
    created_at: "n/a",
    children: [
      {
        id: 6,
        tracking_number: "CGG82oQZc4i8",
        delivery_fee: 0.0,
        total_price: 49.2,
        order_date: new Date("12.22.21"),
        status: "Order Received",
        address: {
          district: "2148 Stratford Park",
          city: "Winchester",
          state: "KY",
          zipCode: "40391",
          country: "United States",
        },
        updated_at: "n/a",
        created_at: "n/a",
      },
    ],
  },
  {
    id: 7,
    tracking_number: "8Bu4O8z0M0am",
    delivery_fee: 50.0,
    total_price: 1641.2,
    order_date: new Date("12.12.21"),
    status: "Order Received",
    address: {
      district: "2148 Stratford Park",
      city: "Winchester",
      state: "KY",
      zipCode: "40391",
      country: "United States",
    },
    updated_at: "n/a",
    created_at: "n/a",
  },
  {
    id: 8,
    tracking_number: "4uZX1gNyJKjz",
    delivery_fee: 50.0,
    total_price: 1641.2,
    order_date: new Date("09.13.21"),
    status: "Order Received",
    address: {
      district: "2148 Stratford Park",
      city: "Winchester",
      state: "KY",
      zipCode: "40391",
      country: "United States",
    },
    updated_at: "n/a",
    created_at: "n/a",
  },
  {
    id: 9,
    tracking_number: "9zGcWzO0smNx",
    delivery_fee: 50.0,
    total_price: 1641.2,
    order_date: new Date("05.05.22"),
    status: "Order Received",
    address: {
      district: "2148 Stratford Park",
      city: "Winchester",
      state: "KY",
      zipCode: "40391",
      country: "United States",
    },
    updated_at: "n/a",
    created_at: "n/a",
  },
];

const defaultOrder: OrdersResponse = {
  id: 9,
  tracking_number: "9zGcWzO0smNx",
  delivery_fee: 50.0,
  total_price: 1641.2,
  order_date: new Date("05.05.22"),
  status: "Order Received",
  address: {
    district: "2148 Stratford Park",
    city: "Winchester",
    state: "KY",
    zipCode: "40391",
    country: "United States",
  },
  updated_at: "n/a",
  created_at: "n/a",
};

const pag: Pagination = {
  sortBy: "",
  direction: "DESC",
  filter: "",
  count: 12,
  page: 1,
  rowsPerPage: 4,
};

class OrderSource {
  async getOrders(): Promise<{
    orders: Array<Order>;
    pagination: Pagination;
  }> {
    await sleep(0.2);

    const response = {
      orders: defaultOrders,
      pagination: pag,
    };

    return {
      orders: Order.fromOrdersDto(response.orders),
      pagination: response.pagination,
    };
  }

  async getOrder(): Promise<Order> {
    await sleep(0.2);

    const response = {
      order: defaultOrder,
    };

    return Order.fromOrderDto(response.order);
  }
}

export const orderSource = new OrderSource();
