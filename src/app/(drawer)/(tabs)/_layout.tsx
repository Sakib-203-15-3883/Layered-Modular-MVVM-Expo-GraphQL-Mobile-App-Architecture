import { NativeTabs } from 'expo-router/unstable-native-tabs';

import { practiceTheme } from '@/features/practice/theme';

const { colors } = practiceTheme;

export default function TabsLayout() {
  return (
    <NativeTabs
      backgroundColor={colors.surface}
      iconColor={{ default: colors.muted, selected: colors.accent }}
      indicatorColor={colors.accentSoft}
      labelStyle={{
        default: { color: colors.muted },
        selected: { color: colors.accent },
      }}
      minimizeBehavior="never"
      tintColor={colors.accent}>
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Label>Home</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          md={{ default: 'home', selected: 'home' }}
          sf={{ default: 'house', selected: 'house.fill' }}
        />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="tab-two">
        <NativeTabs.Trigger.Label>Tab Two</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          md={{ default: 'list', selected: 'list' }}
          sf={{
            default: 'list.bullet.rectangle.portrait',
            selected: 'list.bullet.rectangle.portrait.fill',
          }}
        />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="tab-three">
        <NativeTabs.Trigger.Label>Tab Three</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          md={{ default: 'settings', selected: 'settings' }}
          sf={{ default: 'gearshape', selected: 'gearshape.fill' }}
        />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="tab-four">
        <NativeTabs.Trigger.Label>Tab Four</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          md={{ default: 'bar_chart', selected: 'bar_chart' }}
          sf={{ default: 'chart.bar', selected: 'chart.bar.fill' }}
        />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
