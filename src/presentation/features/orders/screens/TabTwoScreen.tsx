import { StyleSheet, Text, View } from "react-native";
import { useMyOrdersViewModel } from "../viewmodels/useMyOrdersViewModel";

const TabTwoScreen = () => {
  const VM = useMyOrdersViewModel();
  console.log(VM);
  return (
    <View>
      <Text>{VM.data?.orders?.[0]?.id}</Text>
    </View>
  );
};

export default TabTwoScreen;

const styles = StyleSheet.create({});
