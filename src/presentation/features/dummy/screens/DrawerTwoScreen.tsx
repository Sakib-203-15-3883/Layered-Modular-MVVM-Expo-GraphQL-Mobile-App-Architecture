import { useRouter } from 'expo-router';

import PracticeScreen from '../components/PracticeScreen';

export default function DrawerTwoScreen() {
  const router = useRouter();

  return (
    <PracticeScreen
      actions={[
        {
          label: 'Stack 2',
          onPress: () => router.push('/root-two'),
        },
        {
          label: 'Home Tab',
          onPress: () => router.push('/'),
        },
      ]}
    />
  );
}
