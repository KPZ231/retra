import { StyleSheet } from "react-native";

import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors, Fonts } from "@/constants/theme";

export default function ProfileScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{
        light: Colors.light.border,
        dark: Colors.dark.border,
      }}
      headerImage={
        <IconSymbol
          size={310}
          color={Colors.light.icon}
          name="person.fill"
          style={styles.headerImage}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title" style={{ fontFamily: Fonts.rounded }}>
          Profile
        </ThemedText>
      </ThemedView>
      <ThemedText>This is your profile page.</ThemedText>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: Colors.light.icon,
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
});
