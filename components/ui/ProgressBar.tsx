import { Colors } from "@/constants/theme";
import { StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";

interface ProgressBarProps {
  progress: number; // 0 to 100
  color?: string;
  trackColor?: string;
  height?: number;
  label?: string;
  showValue?: boolean;
  style?: StyleProp<ViewStyle>;
}

export function ProgressBar({
  progress,
  color = Colors.light.success,
  trackColor = "#E5E7EB",
  height = 12,
  label,
  showValue = false,
  style,
}: ProgressBarProps) {
  // Clamp progress between 0 and 100
  const clampedProgress = Math.min(Math.max(progress, 0), 100);

  return (
    <View style={[styles.container, style]}>
      {(label || showValue) && (
        <View style={styles.labelRow}>
          {label && <Text style={styles.label}>{label}</Text>}
          {showValue && (
            <Text style={[styles.value, { color }]}>{clampedProgress}%</Text>
          )}
        </View>
      )}
      <View
        style={[
          styles.track,
          { backgroundColor: trackColor, height, borderRadius: height / 2 },
        ]}
      >
        <View
          style={[
            styles.fill,
            {
              backgroundColor: color,
              width: `${clampedProgress}%`,
              borderRadius: height / 2,
            },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  labelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  label: {
    color: "#6B7280", // gray-500
    fontWeight: "600",
    fontSize: 14,
  },
  value: {
    fontWeight: "700",
    fontSize: 14,
  },
  track: {
    width: "100%",
    overflow: "hidden",
  },
  fill: {
    height: "100%",
  },
});
