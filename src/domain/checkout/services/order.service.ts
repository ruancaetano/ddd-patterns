import { v4 as uuid } from "uuid";
import { Customer } from "../../customer/entities/customer.entity";
import { OrderItem } from "../entities/order-item";
import { Order } from "../entities/order.entity";

export class OrderService {
  static placeOrder(customer: Customer, items: OrderItem[]): Order {
    if (!items.length) {
      throw new Error("Order must have at least one item");
    }

    const order = new Order(uuid(), customer.id, items);
    customer.addRewardPoints(order.calculateTotal() / 2);

    return order;
  }

  static calculateAllOrdersTotal(orders: Order[]): number {
    return orders.reduce((sum, order) => sum + order.calculateTotal(), 0);
  }
}
