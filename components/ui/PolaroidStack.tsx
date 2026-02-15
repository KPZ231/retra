import { Colors } from "@/constants/theme";
import { Image } from "expo-image";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

interface PolaroidStackProps {
  images: string[];
  style?: StyleProp<ViewStyle>;
}

export function PolaroidStack({ images, style }: PolaroidStackProps) {
  if (!images || images.length < 2) return null;

  return (
    <View style={[styles.container, style]}>
      {/* Background Image */}
      <View style={[styles.polaroid, styles.polaroidBack]}>
        <Image
          source={{ uri: images[0] }}
          style={styles.image}
          contentFit="cover"
          transition={500}
        />
      </View>

      {/* Foreground Image */}
      <View style={[styles.polaroid, styles.polaroidFront]}>
        <Image
          source={{ uri: images[1] }}
          style={styles.image}
          contentFit="cover"
          transition={500}
        />
        {/* Fake text line on polaroid */}
        <View style={styles.fakeTextLine} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: "100%",
    height: 380,
    alignItems: "center",
    justifyContent: "center",
  },
  polaroid: {
    position: "absolute",
    backgroundColor: Colors.light.card,
    padding: 8,
    paddingBottom: 32,
    borderRadius: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  polaroidBack: {
    transform: [{ rotate: "8deg" }, { translateX: 30 }, { translateY: -10 }],
    shadowOpacity: 0.15,
    shadowRadius: 10,
    zIndex: 1,
  },
  polaroidFront: {
    transform: [{ rotate: "-4deg" }, { translateX: -20 }, { translateY: 20 }],
    shadowOpacity: 0.2,
    shadowRadius: 16,
    zIndex: 2,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },
  image: {
    width: 220,
    height: 280,
    borderRadius: 2,
  },
  fakeTextLine: {
    position: "absolute",
    bottom: 16,
    left: 12,
    height: 4,
    width: 96,
    backgroundColor: Colors.light.inputBackground,
    borderRadius: 9999,
  },
});
