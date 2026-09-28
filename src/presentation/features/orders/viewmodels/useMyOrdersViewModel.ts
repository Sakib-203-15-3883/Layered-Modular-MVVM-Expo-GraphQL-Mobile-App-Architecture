import { useOrders } from "@/graphql/api/orders/orders";
import { useMemo } from "react";
export const useMyOrdersViewModel = () => {
  const userID = "user-001";

  const variables = useMemo(
    () => ({
      userId: userID,
    }),

    [userID],
  );

  const ordersQuery = useOrders(variables);

  return ordersQuery;
};
