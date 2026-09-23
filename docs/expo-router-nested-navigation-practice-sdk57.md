# Expo Router Nested Navigation Practice — SDK 57

This document is a complete practice implementation for a root native Stack
containing a Drawer, whose first screen contains Bottom Tabs.

## Navigation target

    Root Native Stack
    ├── Drawer Navigator
    │   ├── Bottom Tab Navigator
    │   │   ├── Home
    │   │   ├── Tab Two
    │   │   └── Tab Three
    │   ├── Drawer Two
    │   └── Drawer Three
    ├── Root Stack Screen Two
    └── Root Stack Screen Three

This uses dummy screens only. Route files live in src/app, while actual feature
screens live outside the route directory.

## Important mental model

With manual React Navigation:

    Screen registration -> route name -> navigation action

With Expo Router:

    File path -> route path -> navigation action

Expo Router creates the underlying React Navigation navigators from the
filesystem. It does not replace Stack, Drawer, Tabs, headers, history, or
back behavior.

## 1. Create the practice project

### SDK 57 setup

This document targets Expo SDK 57. Use `npx expo install` so Expo selects the
Expo Router and native-library versions compatible with SDK 57. Do not install
an unrelated latest version with plain `npm install`.

This guide uses the standard Stack, Drawer, and Tabs APIs. It does not use the
newer experimental native Stack or Stack composition APIs.

Create a fresh Expo project using the default TypeScript template:

    npx create-expo-app@latest expo-router-navigation-practice
    cd expo-router-navigation-practice

In 2026, create-expo-app may default to a newer SDK than the one you are
practising. Choose SDK 57 when prompted. With an existing project, verify that
the `expo` version in package.json is SDK 57 before installing dependencies.

Confirm that Expo Router is installed:

    npm ls expo-router

If it is missing, install the compatible packages through Expo:

    npx expo install expo-router react-native-safe-area-context react-native-screens expo-linking expo-constants expo-status-bar

For SDK 57, install the native dependencies required by the Drawer:

    npx expo install react-native-reanimated react-native-worklets react-native-gesture-handler

Do not add `@react-navigation/drawer` or `@react-navigation/bottom-tabs` for
this implementation. From SDK 56 onward, the Drawer is bundled by Expo Router
and `Tabs` from `expo-router` owns the bottom-tab integration.

SDK 56 and later also changed application-level imports. Use navigation APIs
from `expo-router` instead of importing them from external
`@react-navigation/*` packages. This document uses `useRouter`, `Stack`, and
`Tabs` from `expo-router`.

The generated project may use either src/app or app. This guide uses src/app.
If your project has app instead, use that directory consistently.

Start the project:

    npx expo start

For an Expo Router project, package.json should use:

    {
      "main": "expo-router/entry"
    }

The Expo Router config plugin should also be present in app.json or
app.config.ts:

    {
      "expo": {
        "scheme": "routerpractice",
        "plugins": ["expo-router"]
      }
    }

Keep generated settings if they already exist.

## 2. Final folder structure

    src/
    ├── app/
    │   ├── _layout.tsx
    │   ├── root-two.tsx
    │   ├── root-three.tsx
    │   └── (drawer)/
    │       ├── _layout.tsx
    │       ├── drawer-two.tsx
    │       ├── drawer-three.tsx
    │       └── (tabs)/
    │           ├── _layout.tsx
    │           ├── index.tsx
    │           ├── tab-two.tsx
    │           └── tab-three.tsx
    │
    └── features/
        └── practice/
            ├── components/
            │   └── PracticeScreen.tsx
            └── screens/
                ├── HomeTabScreen.tsx
                ├── TabTwoScreen.tsx
                ├── TabThreeScreen.tsx
                ├── DrawerTwoScreen.tsx
                ├── DrawerThreeScreen.tsx
                ├── RootStackTwoScreen.tsx
                └── RootStackThreeScreen.tsx

The src/app directory contains navigation routes and layouts. The feature
directory contains the actual screen implementation.

## 3. Configure the root native Stack

Create src/app/\_layout.tsx:

    import { Stack, useRouter } from 'expo-router';
    import { Pressable, StyleSheet, Text } from 'react-native';

    const RootStackBackButton = () => {
      const router = useRouter();
      const canGoBack = router.canGoBack();

      return (
        <Pressable
          accessibilityLabel="Go back"
          accessibilityRole="button"
          disabled={!canGoBack}
          onPress={() => router.back()}
          style={[styles.backButton, !canGoBack && styles.backButtonDisabled]}
        >
          <Text style={styles.backIcon}>‹</Text>
        </Pressable>
      );
    };

    export default function RootLayout() {
      return (
        <Stack
          initialRouteName="(drawer)"
          screenOptions={{
            headerShown: true,
            headerTitleAlign: 'center',
            headerLeft: () => <RootStackBackButton />,
            headerStyle: {
              backgroundColor: '#FFFFFF',
            },
            headerTintColor: '#111827',
            headerTitleStyle: {
              fontWeight: '700',
            },
          }}
        >
          <Stack.Screen
            name="(drawer)"
            options={{ title: 'Drawer Navigator' }}
          />
          <Stack.Screen
            name="root-two"
            options={{ title: 'Root Stack Screen 2' }}
          />
          <Stack.Screen
            name="root-three"
            options={{ title: 'Root Stack Screen 3' }}
          />
        </Stack>
      );
    }

    const styles = StyleSheet.create({
      backButton: {
        alignItems: 'center',
        height: 40,
        justifyContent: 'center',
        width: 40,
      },
      backButtonDisabled: {
        opacity: 0.35,
      },
      backIcon: {
        color: '#111827',
        fontSize: 34,
        lineHeight: 36,
      },
    });

This Stack is backed by React Navigation's native stack.

The first root screen is the drawer route group. The other two root screens are
root-two.tsx and root-three.tsx.

The header has a left back icon and centered title. The first root screen has
no previous Stack entry, so its back icon is disabled. After navigating to
Root Stack Screen 2 or 3, the icon becomes active.

Official reference:

https://docs.expo.dev/router/advanced/stack/

## 4. Configure the Drawer navigator

Create src/app/(drawer)/\_layout.tsx:

    import { Drawer } from 'expo-router/drawer';

    export default function DrawerLayout() {
      return (
        <Drawer
          screenOptions={{
            headerShown: false,
            drawerActiveTintColor: '#2563EB',
            drawerLabelStyle: {
              fontWeight: '600',
            },
          }}
        >
          <Drawer.Screen
            name="(tabs)"
            options={{
              drawerLabel: 'Bottom Tabs',
              title: 'Bottom Tabs',
            }}
          />
          <Drawer.Screen
            name="drawer-two"
            options={{
              drawerLabel: 'Drawer Screen 2',
              title: 'Drawer Screen 2',
            }}
          />
          <Drawer.Screen
            name="drawer-three"
            options={{
              drawerLabel: 'Drawer Screen 3',
              title: 'Drawer Screen 3',
            }}
          />
        </Drawer>
      );
    }

The tabs directory is the first Drawer screen. It contains the Bottom Tab
navigator.

headerShown: false is intentional. The root native Stack header remains
visible, so hiding the Drawer header prevents duplicate headers.

## 5. Configure the Bottom Tab navigator

Create src/app/(drawer)/(tabs)/\_layout.tsx:

    import { Tabs } from 'expo-router';

    export default function TabsLayout() {
      return (
        <Tabs
          screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: '#2563EB',
            tabBarInactiveTintColor: '#64748B',
          }}
        >
          <Tabs.Screen
            name="index"
            options={{
              title: 'Home',
              tabBarLabel: 'Home',
            }}
          />
          <Tabs.Screen
            name="tab-two"
            options={{
              title: 'Tab Two',
              tabBarLabel: 'Tab Two',
            }}
          />
          <Tabs.Screen
            name="tab-three"
            options={{
              title: 'Tab Three',
              tabBarLabel: 'Tab Three',
            }}
          />
        </Tabs>
      );
    }

index.tsx is the default route for the tabs directory and becomes the Home
tab.

## 6. Add thin route files

These files are route adapters. They do not contain business logic.

src/app/(drawer)/(tabs)/index.tsx:

    export { default } from '@/features/practice/screens/HomeTabScreen';

src/app/(drawer)/(tabs)/tab-two.tsx:

    export { default } from '@/features/practice/screens/TabTwoScreen';

src/app/(drawer)/(tabs)/tab-three.tsx:

    export { default } from '@/features/practice/screens/TabThreeScreen';

src/app/(drawer)/drawer-two.tsx:

    export { default } from '@/features/practice/screens/DrawerTwoScreen';

src/app/(drawer)/drawer-three.tsx:

    export { default } from '@/features/practice/screens/DrawerThreeScreen';

src/app/root-two.tsx:

    export { default } from '@/features/practice/screens/RootStackTwoScreen';

src/app/root-three.tsx:

    export { default } from '@/features/practice/screens/RootStackThreeScreen';

If the generated project does not support the @/\* alias, configure tsconfig.json:

    {
      "extends": "expo/tsconfig.base",
      "compilerOptions": {
        "strict": true,
        "baseUrl": ".",
        "paths": {
          "@/*": ["src/*"]
        }
      }
    }

## 7. Create a reusable dummy screen component

Create src/features/practice/components/PracticeScreen.tsx:

    import type { ReactNode } from 'react';
    import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

    type PracticeAction = {
      label: string;
      onPress: () => void;
    };

    type PracticeScreenProps = {
      title: string;
      description: string;
      actions?: PracticeAction[];
      children?: ReactNode;
    };

    export default function PracticeScreen({
      title,
      description,
      actions = [],
      children,
    }: PracticeScreenProps) {
      return (
        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.card}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.description}>{description}</Text>
          </View>

          {children}

          <View style={styles.actions}>
            {actions.map((action) => (
              <Pressable
                key={action.label}
                accessibilityRole="button"
                onPress={action.onPress}
                style={({ pressed }) => [
                  styles.button,
                  pressed && styles.buttonPressed,
                ]}
              >
                <Text style={styles.buttonText}>{action.label}</Text>
              </Pressable>
            ))}
          </View>
        </ScrollView>
      );
    }

    const styles = StyleSheet.create({
      content: {
        backgroundColor: '#F8FAFC',
        flexGrow: 1,
        gap: 16,
        padding: 20,
      },
      card: {
        backgroundColor: '#FFFFFF',
        borderColor: '#E2E8F0',
        borderRadius: 16,
        borderWidth: 1,
        padding: 20,
      },
      title: {
        color: '#0F172A',
        fontSize: 24,
        fontWeight: '800',
      },
      description: {
        color: '#475569',
        fontSize: 15,
        lineHeight: 22,
        marginTop: 8,
      },
      actions: {
        gap: 12,
      },
      button: {
        alignItems: 'center',
        backgroundColor: '#2563EB',
        borderRadius: 12,
        minHeight: 48,
        justifyContent: 'center',
        paddingHorizontal: 16,
      },
      buttonPressed: {
        opacity: 0.75,
      },
      buttonText: {
        color: '#FFFFFF',
        fontSize: 15,
        fontWeight: '700',
      },
    });

## 8. Create the three Bottom Tab screens

Create src/features/practice/screens/HomeTabScreen.tsx:

    import { useRouter } from 'expo-router';
    import PracticeScreen from '../components/PracticeScreen';

    export default function HomeTabScreen() {
      const router = useRouter();

      return (
        <PracticeScreen
          title="Home Tab"
          description="This screen is the first Drawer screen. It contains the Bottom Tab navigator."
          actions={[
            {
              label: 'Push Root Stack Screen 2',
              onPress: () => router.push('/root-two'),
            },
            {
              label: 'Push Root Stack Screen 3',
              onPress: () => router.push('/root-three'),
            },
          ]}
        />
      );
    }

Create src/features/practice/screens/TabTwoScreen.tsx:

    import { useRouter } from 'expo-router';
    import PracticeScreen from '../components/PracticeScreen';

    export default function TabTwoScreen() {
      const router = useRouter();

      return (
        <PracticeScreen
          title="Bottom Tab 2"
          description="This is the second screen inside the Bottom Tab navigator."
          actions={[
            {
              label: 'Open Root Stack Screen 2',
              onPress: () => router.push('/root-two'),
            },
          ]}
        />
      );
    }

Create src/features/practice/screens/TabThreeScreen.tsx:

    import { useRouter } from 'expo-router';
    import PracticeScreen from '../components/PracticeScreen';

    export default function TabThreeScreen() {
      const router = useRouter();

      return (
        <PracticeScreen
          title="Bottom Tab 3"
          description="This is the third screen inside the Bottom Tab navigator."
          actions={[
            {
              label: 'Open Root Stack Screen 3',
              onPress: () => router.push('/root-three'),
            },
          ]}
        />
      );
    }

Pressing a tab changes the active child inside the Tabs navigator. It does not
push a new root Stack screen.

## 9. Create the two additional Drawer screens

Create src/features/practice/screens/DrawerTwoScreen.tsx:

    import { useRouter } from 'expo-router';
    import PracticeScreen from '../components/PracticeScreen';

    export default function DrawerTwoScreen() {
      const router = useRouter();

      return (
        <PracticeScreen
          title="Drawer Screen 2"
          description="This is the second screen registered by the Drawer navigator."
          actions={[
            {
              label: 'Go to Root Stack Screen 2',
              onPress: () => router.push('/root-two'),
            },
          ]}
        />
      );
    }

Create src/features/practice/screens/DrawerThreeScreen.tsx:

    import { useRouter } from 'expo-router';
    import PracticeScreen from '../components/PracticeScreen';

    export default function DrawerThreeScreen() {
      const router = useRouter();

      return (
        <PracticeScreen
          title="Drawer Screen 3"
          description="This is the third screen registered by the Drawer navigator."
          actions={[
            {
              label: 'Go to Root Stack Screen 3',
              onPress: () => router.push('/root-three'),
            },
          ]}
        />
      );
    }

Selecting Drawer Screen 2 or 3 changes the active child of the Drawer
navigator. It does not change the root Stack route.

## 10. Create the two additional root Stack screens

Create src/features/practice/screens/RootStackTwoScreen.tsx:

    import { useRouter } from 'expo-router';
    import PracticeScreen from '../components/PracticeScreen';

    export default function RootStackTwoScreen() {
      const router = useRouter();

      return (
        <PracticeScreen
          title="Root Stack Screen 2"
          description="This screen is the second route in the root native Stack."
          actions={[
            {
              label: 'Go Back',
              onPress: () => router.back(),
            },
            {
              label: 'Push Root Stack Screen 3',
              onPress: () => router.push('/root-three'),
            },
          ]}
        />
      );
    }

Create src/features/practice/screens/RootStackThreeScreen.tsx:

    import { useRouter } from 'expo-router';
    import PracticeScreen from '../components/PracticeScreen';

    export default function RootStackThreeScreen() {
      const router = useRouter();

      return (
        <PracticeScreen
          title="Root Stack Screen 3"
          description="This screen is the third route in the root native Stack."
          actions={[
            {
              label: 'Go Back',
              onPress: () => router.back(),
            },
            {
              label: 'Replace With Drawer',
              onPress: () => router.replace('/'),
            },
          ]}
        />
      );
    }

router.push('/root-two') adds a new entry to the root Stack.

router.back() removes the current entry and returns to the previous route.

router.replace('/') replaces the current root Stack entry, so the user cannot
return to Root Stack Screen 3 using the back button.

## 11. Route tree and URL mapping

    src/app/(drawer)/(tabs)/index.tsx
        -> /
        -> first Drawer screen
        -> first Bottom Tab

    src/app/(drawer)/(tabs)/tab-two.tsx
        -> /tab-two
        -> first Drawer screen
        -> second Bottom Tab

    src/app/(drawer)/(tabs)/tab-three.tsx
        -> /tab-three
        -> first Drawer screen
        -> third Bottom Tab

    src/app/(drawer)/drawer-two.tsx
        -> /drawer-two
        -> second Drawer screen

    src/app/(drawer)/drawer-three.tsx
        -> /drawer-three
        -> third Drawer screen

    src/app/root-two.tsx
        -> /root-two
        -> second root Stack screen

    src/app/root-three.tsx
        -> /root-three
        -> third root Stack screen

The drawer and tabs group names do not appear in the paths because they are
route groups.

## 12. Header ownership

This example deliberately keeps only the root native Stack header visible:

    Root Stack header: visible
    Drawer header: hidden
    Bottom Tab headers: hidden

This avoids rendering three headers above the same screen.

In a real application, decide which navigator owns the header for each surface:

- Root Stack header for full-screen Stack destinations;
- Drawer header for Drawer-level destinations;
- Tab-level header for individual tab flows;
- custom screen header only when the native header is insufficient.

If Drawer Screen 2 and Drawer Screen 3 need their own headers, enable the
Drawer header and consider hiding the root Stack header for the drawer route.

## 13. Run and verify

Start the app:

    npx expo start

Verify this sequence:

1. The app opens on Home.
2. The top native Stack header says Drawer Navigator.
3. The top-left back icon is visible but disabled because the first root Stack
   screen has no previous entry.
4. Home, Tab Two, and Tab Three switch inside the Bottom Tab navigator.
5. Open the Drawer and select Drawer Screen 2.
6. Open the Drawer and select Drawer Screen 3.
7. From Home, push Root Stack Screen 2.
8. Confirm the header title changes to Root Stack Screen 2.
9. Confirm the back icon is now active.
10. Push Root Stack Screen 3.
11. Press back and confirm that it returns to Root Stack Screen 2.
12. Press back again and confirm that it returns to the Drawer/Tab screen.
13. Use Replace With Drawer on Root Stack Screen 3.
14. Confirm that pressing back does not return to Root Stack Screen 3.

## 14. Useful debugging commands

If Metro has stale route information:

    npx expo start -c

Check TypeScript:

    npx tsc --noEmit

The important debugging question is:

    Which _layout.tsx owns this screen?

That tells you which navigator controls its header, back behavior, tab state,
drawer state, and transition.

## 15. Common mistakes

### Adding NavigationContainer

Do not add a manual NavigationContainer. Expo Router owns the container.

### Putting helpers inside src/app

Do not place reusable components or hooks directly in src/app. Expo Router may
interpret files there as routes.

Use src/features or src/shared for non-route code.

### Expecting parentheses to appear in the URL

This:

    src/app/(drawer)/drawer-two.tsx

maps to:

    /drawer-two

not:

    /drawer/drawer-two

### Creating unnecessary nested navigators

A folder can exist only to organize a URL. It does not need its own
\_layout.tsx unless it needs a different navigator or navigator options.

### Registering the same route twice

Do not create multiple route files for the same destination unless you
intentionally understand which navigator owns each route.

### Confusing a tab change with a Stack push

Selecting a Bottom Tab changes the active child inside the Tabs navigator.

Calling:

    router.push('/root-two')

pushes a new route into the root Stack.

These are different navigation operations.

## 16. Final architecture summary

    NavigationContainer
    └── Root Native Stack
        ├── drawer route group
        │   └── Drawer
        │       ├── tabs route group
        │       │   └── Bottom Tabs
        │       │       ├── Home
        │       │       ├── Tab Two
        │       │       └── Tab Three
        │       ├── Drawer Two
        │       └── Drawer Three
        ├── Root Stack Screen 2
        └── Root Stack Screen 3

Expo Router expresses that hierarchy through:

    files       = routes
    _layout.tsx = navigator
    parentheses = route group without URL segment
    index.tsx   = default route for a directory
    useRouter   = imperative navigation
    Link        = declarative navigation

This is the same navigation model you already know from React Navigation, but
the route tree is declared by the filesystem instead of a large collection of
manual screen registrations.

## Official references

- Expo Router introduction:
  https://docs.expo.dev/router/introduction/
- Expo Router core concepts:
  https://docs.expo.dev/router/basics/core-concepts/
- Expo Router notation:
  https://docs.expo.dev/router/basics/notation/
- Expo Router navigation layouts:
  https://docs.expo.dev/router/basics/navigation-layouts/
- Expo Router Stack:
  https://docs.expo.dev/router/advanced/stack/
- Expo Router Drawer:
  https://docs.expo.dev/router/advanced/drawer/
- Expo Router Tabs:
  https://docs.expo.dev/router/advanced/tabs/
