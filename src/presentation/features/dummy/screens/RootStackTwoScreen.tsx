import { useRouter } from 'expo-router';

import PracticeScreen from '../components/PracticeScreen';

export default function RootStackTwoScreen() {
  const router = useRouter();

  return (
    <PracticeScreen
      actions={[
        {
          label: 'Stack 3',
          onPress: () => router.push('/root-three'),
        },
        {
          label: 'Drawer 2',
          onPress: () => router.push('/drawer-two'),
        },
      ]}
    />
  );
}
