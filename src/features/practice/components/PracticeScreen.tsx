import { Pressable, StyleSheet, Text, View } from 'react-native';

import { practiceTheme } from '../theme';

type PracticeAction = {
  label: string;
  onPress: () => void;
};

type PracticeScreenProps = {
  actions: PracticeAction[];
};

export default function PracticeScreen({ actions }: PracticeScreenProps) {
  return (
    <View style={styles.content}>
      <View style={styles.actions}>
        {actions.map((action) => (
          <Pressable
            key={action.label}
            accessibilityRole="button"
            onPress={action.onPress}
            style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}>
            <Text style={styles.buttonText}>{action.label}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    alignItems: 'stretch',
    backgroundColor: practiceTheme.colors.background,
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  actions: {
    gap: 12,
  },
  button: {
    alignItems: 'center',
    backgroundColor: practiceTheme.colors.accent,
    borderRadius: 12,
    justifyContent: 'center',
    minHeight: 48,
    paddingHorizontal: 16,
  },
  buttonPressed: {
    opacity: 0.75,
  },
  buttonText: {
    color: practiceTheme.colors.white,
    fontSize: 15,
    fontWeight: '700',
  },
});
