import { IconSymbol, IconSymbolName } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import {
    StyleProp,
    StyleSheet,
    Text,
    TextStyle,
    TouchableOpacity,
    ViewStyle,
} from "react-native";

interface ThemedButtonProps {
  title: string;
  onPress: () => void;
  icon?: IconSymbolName;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  variant?: "primary" | "secondary";
  activeOpacity?: number;
}

export function ThemedButton({
  title,
  onPress,
  icon,
  style,
  textStyle,
  variant = "primary",
  activeOpacity = 0.9,
}: ThemedButtonProps) {
  const backgroundColor =
    variant === "primary" ? Colors.light.primary : "transparent";
  const textColor =
    variant === "primary" ? Colors.light.card : Colors.light.primary;

  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor }, style]}
      onPress={onPress}
      activeOpacity={activeOpacity}
    >
      <Text style={[styles.text, { color: textColor }, textStyle]}>
        {title}
      </Text>
      {icon && <IconSymbol name={icon} size={20} color={textColor} />}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "100%",
    paddingVertical: 16,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: Colors.light.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  text: {
    fontSize: 18,
    fontWeight: "600",
    marginRight: 8,
    letterSpacing: 0.5,
  },
});
