import { Stack } from "expo-router";

import { practiceTheme } from "@/presentation/theme";
import { QueryProvider } from "@/providers";
const { colors } = practiceTheme;

export default function RootLayout() {
  return (
    <QueryProvider>
      <Stack
        initialRouteName="(drawer)"
        screenOptions={{
          animation: "slide_from_right",
          headerBackButtonDisplayMode: "minimal",
          headerShown: false,
        }}
      >
        <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
        <Stack.Screen
          name="root-two"
          options={{
            title: "Stack 2",
            headerShown: true,
            headerTitleAlign: "center",
            headerStyle: {
              backgroundColor: colors.surface,
            },
            headerTintColor: colors.ink,
            headerTitleStyle: {
              fontWeight: "700",
            },
          }}
        />
        <Stack.Screen
          name="root-three"
          options={{
            title: "Stack 3",
            headerShown: true,
            headerTitleAlign: "center",
            headerStyle: {
              backgroundColor: colors.surface,
            },
            headerTintColor: colors.ink,
            headerTitleStyle: {
              fontWeight: "700",
            },
          }}
        />
      </Stack>
    </QueryProvider>
  );
}
