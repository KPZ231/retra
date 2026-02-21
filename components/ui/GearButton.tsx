import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, TouchableOpacity } from 'react-native';

interface GearButtonProps {
  onPress: () => void;
}

export function GearButton({ onPress }: GearButtonProps) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress} hitSlop={{ top: 10, left: 10, bottom: 10, right: 10 }}>
      <Ionicons name="settings-sharp" size={24} color="#B6A16B" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 4,
    width: 32,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
});
