//The screen does not know how Axios & Tanstack & GraphQL works

import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Text,
  View,
} from "react-native";

import useProductsViewModel from "@/presentation/features/home/viewmodels";
import { CategoryDropdown } from "../components/CategoryDropdown";
import { ProductRow } from "../components/ProductRow";

export default function ProductsScreen() {
  const vm = useProductsViewModel();

  if (vm.isLoading) {
    return <ActivityIndicator />;
  }

  if (vm.isError) {
    return (
      <View>
        <Text>{vm.error?.message ?? "Unable to load products"}</Text>

        <Text onPress={() => vm.refetch()}>Try again</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <CategoryDropdown
        options={vm.categoryOptions}
        value={vm.category}
        onChange={vm.onCategoryChange}
      />

      <Text>Total products: {vm.total}</Text>

      <FlatList
        data={vm.products}
        keyExtractor={(product) => product.id}
        renderItem={({ item }) => <ProductRow product={item} />}
        refreshControl={
          <RefreshControl refreshing={vm.isFetching} onRefresh={vm.refetch} />
        }
        onEndReached={vm.onNextPage}
        onEndReachedThreshold={0.5}
      />

      {vm.isFetching && <ActivityIndicator />}
    </View>
  );
}
