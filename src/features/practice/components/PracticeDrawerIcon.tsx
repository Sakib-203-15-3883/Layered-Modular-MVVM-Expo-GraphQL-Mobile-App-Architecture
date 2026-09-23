import { SymbolView } from 'expo-symbols';
import type { ColorValue } from 'react-native';

export type PracticeDrawerIconName = 'home' | 'drawer-two' | 'drawer-three' | 'logout';

type DrawerSymbol = {
  ios:
    | 'house.fill'
    | 'rectangle.3.group.fill'
    | 'chart.bar.fill'
    | 'rectangle.portrait.and.arrow.right';
  android: 'home' | 'view_list' | 'bar_chart' | 'logout';
  web: 'home' | 'view_list' | 'bar_chart' | 'logout';
};

const symbols: Record<PracticeDrawerIconName, DrawerSymbol> = {
  home: { ios: 'house.fill', android: 'home', web: 'home' },
  'drawer-two': {
    ios: 'rectangle.3.group.fill',
    android: 'view_list',
    web: 'view_list',
  },
  'drawer-three': {
    ios: 'chart.bar.fill',
    android: 'bar_chart',
    web: 'bar_chart',
  },
  logout: {
    ios: 'rectangle.portrait.and.arrow.right',
    android: 'logout',
    web: 'logout',
  },
};

export function PracticeDrawerIcon({
  color,
  name,
  size,
}: {
  color: ColorValue;
  name: PracticeDrawerIconName;
  size: number;
}) {
  return <SymbolView name={symbols[name]} size={size} tintColor={color} />;
}
