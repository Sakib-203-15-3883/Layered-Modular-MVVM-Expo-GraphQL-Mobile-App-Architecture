import type { GetProductsResponse } from "@/graphql/queries/products/products";
import type { Product, ProductsPage } from "./products.types";

export function mapProductsPage(
  response: GetProductsResponse["products"],
): ProductsPage {
  return {
    items: response.items.map(
      (product): Product => ({
        id: product.id,
        title: product.title,
        description: product.description,
        category: product.category,
        price: product.price,
        stock: product.stock,
        createdAt: product.createdAt,
        isInStock: product.stock > 0,
      }),
    ),
    total: response.total,
    page: response.page,
    pageSize: response.pageSize,
    hasNextPage: response.hasNextPage,
  };
}
