import type { OrdersResponse } from "@/data/dto/OrdersResponse";

export class Order {
  id: number;
  trackingNumber: string;
  deliveryFee: number;
  totalPrice: number;
  orderDate: Date;
  status: string;
  address: {
    district: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  children: Array<Order>;

  constructor(options: {
    id: number;
    trackingNumber: string;
    deliveryFee: number;
    totalPrice: number;
    orderDate: Date;
    status: string;
    address: {
      district: string;
      city: string;
      state: string;
      zipCode: string;
      country: string;
    };
    children: Array<Order>;
  }) {
    this.id = options.id;
    this.trackingNumber = options.trackingNumber;
    this.deliveryFee = options.deliveryFee;
    this.totalPrice = options.totalPrice;
    this.orderDate = options.orderDate;
    this.status = options.status;
    this.address = options.address;
    this.children = options.children;
  }

  static fromOrdersDto(OrdersResponse: OrdersResponse[]): Array<Order> {
    return OrdersResponse.map((order: OrdersResponse) => {
      return new Order({
        id: order.id,
        trackingNumber: order.tracking_number,
        deliveryFee: order.delivery_fee,
        totalPrice: order.total_price,
        orderDate: order.order_date,
        status: order.status,
        address: order.address,
        children: order.children ? Order.fromOrdersDto(order?.children) : [],
      });
    });
  }

  static fromOrderDto(OrderResponse: OrdersResponse): Order {
    return new Order({
      id: OrderResponse.id,
      trackingNumber: OrderResponse.tracking_number,
      deliveryFee: OrderResponse.delivery_fee,
      totalPrice: OrderResponse.total_price,
      orderDate: OrderResponse.order_date,
      status: OrderResponse.status,
      address: OrderResponse.address,
      children: OrderResponse.children
        ? Order.fromOrdersDto(OrderResponse?.children)
        : [],
    });
  }
}
