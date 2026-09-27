import type { Product } from "@/graphql/api/products/products.types";
import { Text, View } from "react-native";

type ProductRowProps = {
  product: Product;
};

export function ProductRow({ product }: ProductRowProps) {
  return (
    <View>
      <Text>{product.title}</Text>
      <Text>{product.description}</Text>
      <Text>Price: {product.price}</Text>
      <Text>Category: {product.category}</Text>
      <Text>{product.isInStock ? "In stock" : "Out of stock"}</Text>
    </View>
  );
}
