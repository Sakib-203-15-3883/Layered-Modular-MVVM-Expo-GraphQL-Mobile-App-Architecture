# Expo Router Nested Navigation Practice

This Expo SDK 57 project demonstrates a nested navigation architecture with
Expo Router: a root native Stack containing a Drawer, whose first route owns
native Bottom Tabs.

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside `src/app`. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Navigation architecture

```text
Root Stack
├── Drawer
│   ├── Native Bottom Tabs: Home, Tab Two, Tab Three, Tab Four
│   ├── Drawer Screen 2
│   └── Drawer Screen 3
├── Root Stack Screen 2
└── Root Stack Screen 3
```

Route adapters live in `src/app`; reusable dummy screens live in
`src/features/practice`. The root stack owns the visible header, while the
Drawer and Native Bottom Tabs hide theirs to avoid duplicate headers.

### Other setup steps

- To set up ESLint for linting, run `npx expo lint`, or follow our guide on ["Using ESLint and Prettier"](https://docs.expo.dev/guides/using-eslint/)
- If you'd like to set up unit testing, follow our guide on ["Unit Testing with Jest"](https://docs.expo.dev/develop/unit-testing/)
- Learn more about the TypeScript setup in this template in our guide on ["Using TypeScript"](https://docs.expo.dev/guides/typescript/)

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
# Layered-Modular-MVVM-Expo-Mobile-App-Architecture
