import { Colors } from "@/constants/theme";
import { StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";

interface BadgeProps {
  text: string;
  color?: string;
  backgroundColor?: string;
  style?: StyleProp<ViewStyle>;
}

export function Badge({
  text,
  color = Colors.light.primary,
  backgroundColor = "#FEF3C7", // amber-100
  style,
}: BadgeProps) {
  return (
    <View style={[styles.container, { backgroundColor }, style]}>
      <Text style={[styles.text, { color }]}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 999,
    alignSelf: "flex-start",
  },
  text: {
    fontWeight: "600",
    fontSize: 12,
  },
});
