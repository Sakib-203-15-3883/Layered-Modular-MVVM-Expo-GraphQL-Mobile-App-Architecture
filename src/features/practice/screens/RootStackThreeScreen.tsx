import { useRouter } from 'expo-router';

import PracticeScreen from '../components/PracticeScreen';

export default function RootStackThreeScreen() {
  const router = useRouter();

  return (
    <PracticeScreen
      actions={[
        {
          label: 'Drawer 3',
          onPress: () => router.push('/drawer-three'),
        },
        {
          label: 'Workspace',
          onPress: () => router.replace('/'),
        },
      ]}
    />
  );
}
