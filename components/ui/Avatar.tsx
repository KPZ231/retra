import { Colors } from "@/constants/theme";
import { Image } from "expo-image";
import {
    StyleProp,
    StyleSheet,
    TouchableOpacity,
    View,
    ViewStyle,
} from "react-native";

interface AvatarProps {
  source: string | { uri: string };
  size?: number;
  showStatus?: boolean;
  statusColor?: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

export function Avatar({
  source,
  size = 48,
  showStatus = false,
  statusColor = Colors.light.primary,
  onPress,
  style,
}: AvatarProps) {
  const Container = onPress ? TouchableOpacity : View;

  return (
    <Container style={[styles.container, style]} onPress={onPress}>
      <Image
        source={source}
        style={{
          width: size,
          height: size,
          borderRadius: size / 2,
          borderWidth: 2,
          borderColor: "#FFFFFF",
        }}
        contentFit="cover"
      />
      {showStatus && (
        <View
          style={[
            styles.statusDot,
            {
              backgroundColor: statusColor,
              width: size * 0.25,
              height: size * 0.25,
              borderRadius: (size * 0.25) / 2,
            },
          ]}
        />
      )}
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  statusDot: {
    position: "absolute",
    top: 0,
    right: 0,
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
});
