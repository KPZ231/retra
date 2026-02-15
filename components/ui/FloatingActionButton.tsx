import { IconSymbol, IconSymbolName } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import {
    StyleProp,
    StyleSheet,
    TouchableOpacity,
    ViewStyle,
} from "react-native";

interface FloatingActionButtonProps {
  onPress?: () => void;
  icon?: IconSymbolName;
  color?: string;
  iconColor?: string;
  size?: number;
  style?: StyleProp<ViewStyle>;
}

export function FloatingActionButton({
  onPress,
  icon = "plus",
  color = "#EADDCD",
  iconColor = Colors.light.text,
  size = 64,
  style,
}: FloatingActionButtonProps) {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: color,
          width: size,
          height: size,
          borderRadius: size / 2,
        },
        style,
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <IconSymbol name={icon} size={size / 2} color={iconColor} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
});
