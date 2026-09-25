import { useSegments } from "expo-router";
import { Drawer } from "expo-router/drawer";

import PracticeDrawerContent from "@/presentation/features/dummy/components/PracticeDrawerContent";
import { PracticeDrawerIcon } from "@/presentation/features/dummy/components/PracticeDrawerIcon";
import { practiceTheme } from "@/presentation/theme";

const { colors } = practiceTheme;

export default function DrawerLayout() {
  const segments = useSegments();
  const activeRoute = segments[segments.length - 1];
  const activeTabTitle =
    activeRoute === "tab-two"
      ? "Tab Two"
      : activeRoute === "tab-three"
        ? "Tab Three"
        : activeRoute === "tab-four"
          ? "Tab Four"
          : "Home";

  return (
    <Drawer
      drawerContent={(props) => <PracticeDrawerContent {...props} />}
      screenOptions={{
        headerShown: true,
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: colors.surface,
        },
        headerTintColor: colors.accent,
        headerTitleAlign: "center",
        headerTitleStyle: {
          color: colors.ink,
          fontWeight: "700",
        },
        drawerStyle: {
          backgroundColor: colors.background,
          width: 304,
        },
        sceneStyle: {
          backgroundColor: colors.background,
        },
        drawerActiveTintColor: colors.accent,
        drawerActiveBackgroundColor: colors.accentSoft,
        drawerInactiveTintColor: colors.muted,
        drawerItemStyle: {
          borderRadius: 12,
          marginHorizontal: 0,
          marginVertical: 2,
        },
        drawerLabelStyle: {
          fontSize: 15,
          fontWeight: "600",
          marginLeft: 4,
        },
      }}
    >
      <Drawer.Screen
        name="(tabs)"
        options={{
          drawerLabel: "Workspace",
          drawerIcon: ({ color, size }) => (
            <PracticeDrawerIcon color={color} name="home" size={size} />
          ),
          title: activeTabTitle,
        }}
      />
      <Drawer.Screen
        name="drawer-two"
        options={{
          drawerLabel: "Drawer 2",
          drawerIcon: ({ color, size }) => (
            <PracticeDrawerIcon color={color} name="drawer-two" size={size} />
          ),
          title: "Drawer 2",
        }}
      />
      <Drawer.Screen
        name="drawer-three"
        options={{
          drawerLabel: "Drawer 3",
          drawerIcon: ({ color, size }) => (
            <PracticeDrawerIcon color={color} name="drawer-three" size={size} />
          ),
          title: "Drawer 3",
        }}
      />
    </Drawer>
  );
}
