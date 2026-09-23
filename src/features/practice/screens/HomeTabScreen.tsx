import { useRouter } from 'expo-router';

import PracticeScreen from '../components/PracticeScreen';

export default function HomeTabScreen() {
  const router = useRouter();

  return (
    <PracticeScreen
      actions={[
        {
          label: 'Stack 2',
          onPress: () => router.push('/root-two'),
        },
        {
          label: 'Drawer 2',
          onPress: () => router.push('/drawer-two'),
        },
      ]}
    />
  );
}
