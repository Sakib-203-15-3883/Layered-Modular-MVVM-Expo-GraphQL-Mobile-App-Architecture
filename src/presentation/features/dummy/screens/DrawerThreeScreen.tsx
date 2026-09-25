import { useRouter } from 'expo-router';

import PracticeScreen from '../components/PracticeScreen';

export default function DrawerThreeScreen() {
  const router = useRouter();

  return (
    <PracticeScreen
      actions={[
        {
          label: 'Stack 3',
          onPress: () => router.push('/root-three'),
        },
        {
          label: 'Home Tab',
          onPress: () => router.push('/'),
        },
      ]}
    />
  );
}
