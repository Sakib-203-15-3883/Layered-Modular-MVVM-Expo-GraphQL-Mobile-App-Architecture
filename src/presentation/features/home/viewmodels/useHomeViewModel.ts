// A ViewModel is the presentation-orchestration layer between a screen and the application’s data/state layers.

//It prepares everything the screen needs to render and handles everything the user can do on that screen.

//  Most common Responsibilities :
//  1. Owns screen-specific UI state
//  2. Consumes server state
//  3. Derives UI-ready data
//  4. Exposes user-action handlers

import { useMemo, useState } from "react";

import { useProducts } from "@/graphql/api/products/products";

import type { ProductCategory } from "@/graphql/queries/products/products";

const PAGE_SIZE = 10;

export const PRODUCT_CATEGORY_OPTIONS = [
  { label: "All categories", value: undefined },
  { label: "Books", value: "BOOKS" as const },
  { label: "Clothing", value: "CLOTHING" as const },
  { label: "Electronics", value: "ELECTRONICS" as const },
  { label: "Food", value: "FOOD" as const },
];

export default function useProductsViewModel() {
  const [category, setCategory] = useState<ProductCategory | undefined>();

  const [page, setPage] = useState(1);

  const variables = useMemo(
    () => ({
      pagination: {
        page,
        pageSize: PAGE_SIZE,
      },
      filter: category
        ? {
            category,
          }
        : undefined,
    }),
    [category, page],
  );

  const productsQuery = useProducts(variables);

  const onCategoryChange = (nextCategory?: ProductCategory) => {
    setCategory(nextCategory);
    setPage(1);
  };

  const onNextPage = () => {
    if (productsQuery.data?.hasNextPage && !productsQuery.isFetching) {
      // console.log("Loading next page:", page + 1);
      setPage((currentPage) => currentPage + 1);
    }
  };

  return {
    products: productsQuery.data?.items ?? [],
    total: productsQuery.data?.total ?? 0,
    page,
    category,

    categoryOptions: PRODUCT_CATEGORY_OPTIONS,

    isLoading: productsQuery.isLoading,
    isFetching: productsQuery.isFetching,
    isError: productsQuery.isError,
    error: productsQuery.error,

    hasNextPage: productsQuery.data?.hasNextPage ?? false,

    onCategoryChange,
    onNextPage,
    refetch: productsQuery.refetch,
  };
}
