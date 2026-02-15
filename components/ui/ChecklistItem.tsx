import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface ChecklistItemProps {
  text: string;
  completed: boolean;
  onToggle?: () => void;
}

export function ChecklistItem({
  text,
  completed,
  onToggle,
}: ChecklistItemProps) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onToggle}
      activeOpacity={onToggle ? 0.7 : 1}
      disabled={!onToggle}
    >
      <IconSymbol
        name={completed ? "checkmark.circle.fill" : "circle"}
        size={24}
        color={completed ? Colors.light.primary : Colors.light.textSecondary}
      />
      <Text style={[styles.text, completed && styles.strikethrough]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    paddingVertical: 4,
  },
  text: {
    fontSize: 16,
    color: "#374151", // gray-700
    fontWeight: "500",
    flex: 1,
  },
  strikethrough: {
    textDecorationLine: "line-through",
    color: "#9CA3AF", // gray-400
  },
});
