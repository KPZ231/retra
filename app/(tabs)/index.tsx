import { PaginationDots } from "@/components/ui/PaginationDots";
import { PolaroidStack } from "@/components/ui/PolaroidStack";
import { ThemedButton } from "@/components/ui/ThemedButton";
import { Colors } from "@/constants/theme";
import { Link, useRouter } from "expo-router";
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

export default function WelcomeScreen() {
  const router = useRouter();

  const handleStart = () => {
    router.push("/(tabs)/home");
  };

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
        <PolaroidStack
          images={[
            "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=500&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1511497584788-876760111969?q=80&w=500&auto=format&fit=crop",
          ]}
          style={styles.imagesContainer}
        />

        {/* Footer Section */}
        <View style={styles.footerContainer}>
          {/* Pagination Dots */}
          <PaginationDots total={4} currentIndex={0} style={styles.dots} />

          {/* Action Button */}
          <ThemedButton
            title="Start your journey"
            onPress={handleStart}
            icon="arrow.right"
            style={styles.button}
          />

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
    letterSpacing: 2.4,
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
    lineHeight: 46,
    letterSpacing: -0.5,
  },
  italicText: {
    color: Colors.light.primary,
    fontWeight: "500",
    fontStyle: "italic",
    fontFamily: Platform.select({ ios: "Georgia-Italic", android: "serif" }),
  },
  imagesContainer: {
    marginTop: -16,
  },
  footerContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 24,
  },
  dots: {
    marginBottom: 32,
  },
  button: {
    marginBottom: 0,
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
