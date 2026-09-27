import { useQuery } from "@tanstack/react-query";
import { graphqlRequest } from "@/graphql/client";

import {
  GetOrders,
  type GetOrdersVariables,
  type GetOrdersResponse,
} from "@/graphql/queries/products/orders";

export function ordersQueryOptions(variables: GetOrdersVariables) {
  return {
    queryKey: ["orders", variables],
    queryFn: async () => {
      const response = await graphqlRequest<GetOrdersResponse>(
        GetOrders,
        variables,
      );

      return response.data;
    },
  };
}

export function useOrders(variables: GetOrdersVariables, enabled= true) {
  return useQuery({
    ...ordersQueryOptions(variables),
    enabled,
  });
}
