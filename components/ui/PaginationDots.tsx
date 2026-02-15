import { Colors } from "@/constants/theme";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

interface PaginationDotsProps {
  total?: number;
  currentIndex?: number;
  activeColor?: string;
  inactiveColor?: string;
  style?: StyleProp<ViewStyle>;
}

export function PaginationDots({
  total = 4,
  currentIndex = 0,
  activeColor = Colors.light.primary,
  inactiveColor = Colors.light.border,
  style,
}: PaginationDotsProps) {
  return (
    <View style={[styles.container, style]}>
      {Array.from({ length: total }).map((_, index) => (
        <View
          key={index}
          style={[
            styles.dot,
            {
              backgroundColor:
                index === currentIndex ? activeColor : inactiveColor,
            },
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});
