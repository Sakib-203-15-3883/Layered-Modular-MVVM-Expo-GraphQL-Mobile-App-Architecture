//The screen does not know how Axios & Tanstack & GraphQL works

import useHomeViewModel from "@/presentation/features/home/viewmodels";
import { StyleSheet, Text, View } from "react-native";
const HomeTabScreen = () => {
  const VM = useHomeViewModel();
  // console.log(VM);
  return (
    <View>
      <Text>{VM.name}</Text>
      <Text>{VM.value}</Text>
    </View>
  );
};

export default HomeTabScreen;

const styles = StyleSheet.create({});
