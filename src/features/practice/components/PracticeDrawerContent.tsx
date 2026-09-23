import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
  type DrawerContentComponentProps,
} from "expo-router/drawer";
import { Alert, StyleSheet, Text, View } from "react-native";

import { PracticeDrawerIcon } from "./PracticeDrawerIcon";
import { practiceTheme } from "../theme";

const { colors } = practiceTheme;

export default function PracticeDrawerContent({
  navigation,
  ...props
}: DrawerContentComponentProps) {
  return (
    <DrawerContentScrollView
      contentContainerStyle={styles.content}
      style={styles.scrollView}
    >
      <View style={styles.header}>
        <View style={styles.logo}>
          <Text style={styles.logoText}>ER</Text>
        </View>
        <View style={styles.headerCopy}>
          <Text accessibilityRole="header" style={styles.appName}>
            Workspace
          </Text>
          <Text style={styles.appSubtitle}>Navigation practice</Text>
        </View>
      </View>

      <View style={styles.divider} />

      <Text style={styles.sectionLabel}>MAIN MENU</Text>
      <DrawerItemList {...props} navigation={navigation} />

      <View style={styles.spacer} />

      <View style={styles.divider} />
      <DrawerItem
        accessibilityLabel="Log out"
        focused={false}
        icon={({ color, size }) => (
          <PracticeDrawerIcon color={color} name="logout" size={size} />
        )}
        inactiveTintColor={colors.danger}
        label="Log out"
        labelStyle={styles.logoutLabel}
        onPress={() => {
          navigation.closeDrawer();
          Alert.alert(
            "Log out",
            "This practice app does not have an account session connected yet.",
            [{ text: "OK" }],
          );
        }}
        pressOpacity={0.75}
        style={styles.logoutItem}
      />
      <Text style={styles.footerText}>Practice mode</Text>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: colors.background,
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: 12,
  },
  header: {
    alignItems: "center",
    flexDirection: "row",
    gap: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  logo: {
    alignItems: "center",
    backgroundColor: colors.accent,
    borderRadius: 14,
    height: 48,
    justifyContent: "center",
    width: 48,
  },
  logoText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  headerCopy: {
    flex: 1,
  },
  appName: {
    color: colors.ink,
    fontSize: 17,
    fontWeight: "800",
  },
  appSubtitle: {
    color: colors.muted,
    fontSize: 12,
    marginTop: 2,
  },
  divider: {
    backgroundColor: colors.divider,
    height: StyleSheet.hairlineWidth,
    marginHorizontal: 8,
    marginVertical: 20,
  },
  sectionLabel: {
    color: colors.muted,
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1,
    marginBottom: 8,
    marginHorizontal: 12,
  },
  spacer: {
    flex: 1,
    minHeight: 24,
  },
  logoutItem: {
    borderRadius: 12,
    marginHorizontal: 0,
    marginVertical: 0,
  },
  logoutLabel: {
    color: colors.danger,
    fontSize: 15,
    fontWeight: "700",
    marginLeft: 4,
  },
  footerText: {
    color: colors.muted,
    fontSize: 11,
    marginTop: 12,
    paddingHorizontal: 12,
  },
});
