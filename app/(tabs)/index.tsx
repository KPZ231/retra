import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import { Image } from "expo-image";
import { Link } from "expo-router";
import {
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Section */}
        <View style={styles.headerContainer}>
          <Text style={styles.brandText}>RETRA</Text>
          <Text style={styles.titleText}>Create</Text>
          <Text style={styles.titleText}>memories.</Text>
          <Text style={[styles.titleText, styles.italicText]}>
            Intentionally.
          </Text>
        </View>

        {/* Polaroid Images Section */}
        <View style={styles.imagesContainer}>
          {/* Background Image (Mountains) */}
          <View style={[styles.polaroid, styles.polaroidBack]}>
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=500&auto=format&fit=crop",
              }}
              style={styles.image}
              contentFit="cover"
              transition={500}
            />
          </View>

          {/* Foreground Image (Forest) */}
          <View style={[styles.polaroid, styles.polaroidFront]}>
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1511497584788-876760111969?q=80&w=500&auto=format&fit=crop",
              }}
              style={styles.image}
              contentFit="cover"
              transition={500}
            />
            {/* Fake text line on polaroid */}
            <View style={styles.fakeTextLine} />
          </View>
        </View>

        {/* Footer Section */}
        <View style={styles.footerContainer}>
          {/* Pagination Dots */}
          <View style={styles.dotsContainer}>
            <View style={[styles.dot, styles.dotActive]} />
            <View style={styles.dot} />
            <View style={styles.dot} />
            <View style={styles.dot} />
          </View>

          {/* Action Button */}
          <Link href="/(tabs)/explore" asChild>
            <TouchableOpacity style={styles.button} activeOpacity={0.9}>
              <Text style={styles.buttonText}>Start your journey</Text>
              <IconSymbol
                name="arrow.right"
                size={20}
                color={Colors.light.card}
              />
            </TouchableOpacity>
          </Link>

          {/* Login Link */}
          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Already have an account? </Text>
            <Link href="/modal" asChild>
              <TouchableOpacity>
                <Text style={styles.loginLink}>Log in</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 24,
  },
  headerContainer: {
    alignItems: "center",
    marginTop: 16,
    width: "100%",
  },
  brandText: {
    color: Colors.light.primary,
    letterSpacing: 2.4, // tracking-[0.2em] approx
    fontWeight: "600",
    fontSize: 12,
    marginBottom: 24,
    textTransform: "uppercase",
  },
  titleText: {
    color: Colors.light.text,
    fontSize: 42,
    fontFamily: Platform.select({ ios: "System", android: "sans-serif" }),
    fontWeight: "400",
    textAlign: "center",
    lineHeight: 46, // leading-tight
    letterSpacing: -0.5, // tracking-tight
  },
  italicText: {
    color: Colors.light.primary,
    fontWeight: "500",
    fontStyle: "italic",
    fontFamily: Platform.select({ ios: "Georgia-Italic", android: "serif" }),
  },
  imagesContainer: {
    position: "relative",
    width: "100%",
    height: 380,
    alignItems: "center",
    justifyContent: "center",
    marginTop: -16,
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
  footerContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 24,
  },
  dotsContainer: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 32,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.light.border,
  },
  dotActive: {
    backgroundColor: Colors.light.primary,
  },
  button: {
    backgroundColor: Colors.light.primary,
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
  buttonText: {
    color: Colors.light.card,
    fontSize: 18,
    fontWeight: "600",
    marginRight: 8,
    letterSpacing: 0.5,
  },
  loginContainer: {
    flexDirection: "row",
    marginTop: 24,
  },
  loginText: {
    color: Colors.light.textSecondary,
    fontSize: 16,
  },
  loginLink: {
    color: Colors.light.text,
    fontWeight: "600",
    fontSize: 16,
  },
});
