import type { ProductCategory } from '@/graphql/queries/products/products';

export type Product = {
  id: string;
  title: string;
  description: string;
  category: ProductCategory;
  price: number;
  stock: number;
  createdAt: string;
  isInStock: boolean;
};

export type ProductsPage = {
  items: Product[];
  total: number;
  page: number;
  pageSize: number;
  hasNextPage: boolean;
};