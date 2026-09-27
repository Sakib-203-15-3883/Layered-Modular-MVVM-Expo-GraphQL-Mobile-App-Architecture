// API adapter between the ViewModel and the lower GraphQL/React Query layers
//Upward connection: ViewModel
//Products.ts creates the React Query configuration

import { useQuery } from "@tanstack/react-query";

import { graphqlRequest } from "@/graphql/client";

import {
    GET_PRODUCTS,
    type GetProductsResponse,
    type GetProductsVariables,
} from "@/graphql/queries/products/products";

import { mapProductsPage } from "./products.mappers";
import type { ProductsPage } from "./products.types";

export function productsQueryOptions(variables: GetProductsVariables) {
  return {
    queryKey: ["products", variables] as const,

    queryFn: async (): Promise<ProductsPage> => {
      const response = await graphqlRequest<GetProductsResponse>(
        GET_PRODUCTS,
        variables,
      );

      if (response.errors?.length) {
        throw new Error(response.errors[0].message);
      }

      if (!response.data?.products) {
        throw new Error("Products response is empty");
      }

      return mapProductsPage(response.data.products);
    },
  };
}

export function useProducts(variables: GetProductsVariables, enabled = true) {
  return useQuery({
    ...productsQueryOptions(variables),
    enabled,
  });
}
