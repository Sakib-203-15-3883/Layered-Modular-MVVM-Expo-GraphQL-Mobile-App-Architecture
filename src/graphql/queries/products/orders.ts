import { Float } from "react-native/Libraries/Types/CodegenTypes";
import type { ProductCategory } from "./products";
export type GetOrdersVariables = {
  userId: string;
};

export const GetOrders = `query getOrders($userId: ID!) {
  orders(userId: $userId) {
    id
    items {
      product {
        id
        title
        category
        description
        price
        stock
      }
      quantity
      subtotal
      unitPrice
    }
    status
    total
    user {
      id
      name
      email
    }
  }
}`;

export type GraphQlItems = {
  id: string;
  title: string;
  category: ProductCategory;
  description: string;
  price: Float;
  stock: number;
};

export type OrderStatus = "CANCELLED" | "PAID" | "PENDING" | "SHIPPED";

export type GetOrdersResponse = {
  orders: {
    id: string;
    items: {
      product: GraphQlItems;
      quantity: Float;
      subtotal: Float;
      unitPrice: Float;
    };
    status: OrderStatus;
    total: Float;
    user: {
      id: string;
      name: string;
      email: string;
    };
  };
};
