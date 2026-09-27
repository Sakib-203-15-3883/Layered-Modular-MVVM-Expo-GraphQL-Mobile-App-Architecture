export type ProductCategory =
  | 'BOOKS'
  | 'CLOTHING'
  | 'ELECTRONICS'
  | 'FOOD';

export type GetProductsVariables = {
  pagination: {
    page: number;
    pageSize: number;
  };
  filter?: {
    category?: ProductCategory;
  };
};

export const GET_PRODUCTS = `
  query GetProducts(
    $pagination: ProductPaginationInput!
    $filter: ProductFilterInput
  ) {
    products(
      pagination: $pagination
      filter: $filter
    ) {
      items {
        id
        title
        description
        category
        price
        stock
        createdAt
      }
      total
      page
      pageSize
      hasNextPage
    }
  }
`;

export type GraphQLProduct = {
  id: string;
  title: string;
  description: string;
  category: ProductCategory;
  price: number;
  stock: number;
  createdAt: string;
};

export type GetProductsResponse = {
  products: {
    items: GraphQLProduct[];
    total: number;
    page: number;
    pageSize: number;
    hasNextPage: boolean;
  };
};