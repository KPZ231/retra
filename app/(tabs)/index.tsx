import { PaginationDots } from "@/components/ui/PaginationDots";
import { PolaroidStack } from "@/components/ui/PolaroidStack";
import { ThemedButton } from "@/components/ui/ThemedButton";
import { Colors } from "@/constants/theme";
import { isAuthenticated } from "@/lib/auth";
import {
  loginWithEmail,
  registerWithEmail,
  signInWithApple,
  useGoogleAuth,
} from "@/lib/socialAuth";
import * as AppleAuthentication from "expo-apple-authentication";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function WelcomeScreen() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [showAuthForm, setShowAuthForm] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [isAppleSignInAvailable, setIsAppleSignInAvailable] = useState(false);

  const { signInWithGoogle, request: googleRequest } = useGoogleAuth();

  useEffect(() => {
    // Check if user is already authenticated
    checkAuthStatus();

    // Check if Apple Sign In is available
    if (Platform.OS === "ios") {
      AppleAuthentication.isAvailableAsync().then(setIsAppleSignInAvailable);
    }
  }, []);

  const checkAuthStatus = async () => {
    const authenticated = await isAuthenticated();
    if (authenticated) {
      router.replace("/(tabs)/home");
    }
  };

  const handleEmailAuth = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      if (isLogin) {
        await loginWithEmail(email, password);
        Alert.alert("Success", "Logged in successfully!");
      } else {
        await registerWithEmail(email, password, name);
        Alert.alert("Success", "Account created successfully!");
      }
      router.replace("/(tabs)/home");
    } catch (error: any) {
      Alert.alert("Error", error.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const result = await signInWithGoogle();
      if (result) {
        Alert.alert("Success", "Signed in with Google!");
        router.replace("/(tabs)/home");
      }
    } catch (error: any) {
      Alert.alert("Error", error.message || "Google sign in failed");
    } finally {
      setLoading(false);
    }
  };

  const handleAppleSignIn = async () => {
    setLoading(true);
    try {
      await signInWithApple();
      Alert.alert("Success", "Signed in with Apple!");
      router.replace("/(tabs)/home");
    } catch (error: any) {
      Alert.alert("Error", error.message || "Apple sign in failed");
    } finally {
      setLoading(false);
    }
  };

  if (showAuthForm) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.headerContainer}>
            <Text style={styles.brandText}>RETRA</Text>
            <Text style={styles.authTitle}>
              {isLogin ? "Welcome Back" : "Create Account"}
            </Text>
            <Text style={styles.authSubtitle}>
              {isLogin
                ? "Sign in to continue your journey"
                : "Start creating memories intentionally"}
            </Text>
          </View>

          {/* Auth Form */}
          <View style={styles.formContainer}>
            {!isLogin && (
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Name</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Your name"
                  placeholderTextColor={Colors.light.textSecondary}
                  value={name}
                  onChangeText={setName}
                  autoCapitalize="words"
                />
              </View>
            )}

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="your@email.com"
                placeholderTextColor={Colors.light.textSecondary}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Password</Text>
              <TextInput
                style={styles.input}
                placeholder="••••••••"
                placeholderTextColor={Colors.light.textSecondary}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>

            <ThemedButton
              title={loading ? "" : isLogin ? "Sign In" : "Create Account"}
              onPress={handleEmailAuth}
              style={styles.authButton}
              disabled={loading}
            >
              {loading && <ActivityIndicator color="#fff" />}
            </ThemedButton>

            {/* Divider */}
            <View style={styles.dividerContainer}>
              <View style={styles.divider} />
              <Text style={styles.dividerText}>OR</Text>
              <View style={styles.divider} />
            </View>

            {/* Social Auth Buttons */}
            <View style={styles.socialButtonsContainer}>
              <TouchableOpacity
                style={styles.socialButton}
                onPress={handleGoogleSignIn}
                disabled={loading || !googleRequest}
              >
                <Text style={styles.socialButtonText}>🔍 Google</Text>
              </TouchableOpacity>

              {isAppleSignInAvailable && Platform.OS === "ios" && (
                <TouchableOpacity
                  style={[styles.socialButton, styles.appleButton]}
                  onPress={handleAppleSignIn}
                  disabled={loading}
                >
                  <Text
                    style={[styles.socialButtonText, styles.appleButtonText]}
                  >
                    Apple
                  </Text>
                </TouchableOpacity>
              )}
            </View>

            {/* Toggle Login/Register */}
            <View style={styles.toggleContainer}>
              <Text style={styles.toggleText}>
                {isLogin
                  ? "Don't have an account? "
                  : "Already have an account? "}
              </Text>
              <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
                <Text style={styles.toggleLink}>
                  {isLogin ? "Sign Up" : "Sign In"}
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.backButton}
              onPress={() => setShowAuthForm(false)}
            >
              <Text style={styles.backButtonText}>← Back to Welcome</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

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
              onPress={() => {
                setIsLogin(false);
                setShowAuthForm(true);
              }}
              icon="arrow.right"
              style={styles.button}
            />

          {/* Login Link */}
          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Already have an account? </Text>
            <TouchableOpacity
              onPress={() => {
                setIsLogin(true);
                setShowAuthForm(true);
              }}
            >
              <Text style={styles.loginLink}>Log in</Text>
            </TouchableOpacity>
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
  authTitle: {
    color: Colors.light.text,
    fontSize: 28,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 8,
  },
  authSubtitle: {
    color: Colors.light.textSecondary,
    fontSize: 15,
    textAlign: "center",
    marginBottom: 32,
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
  formContainer: {
    width: "100%",
    maxWidth: 400,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    color: Colors.light.text,
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#F5F5F5",
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: Colors.light.text,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  authButton: {
    marginTop: 8,
    marginBottom: 24,
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 24,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "#E0E0E0",
  },
  dividerText: {
    color: Colors.light.textSecondary,
    fontSize: 14,
    marginHorizontal: 16,
  },
  socialButtonsContainer: {
    gap: 12,
  },
  socialButton: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  appleButton: {
    backgroundColor: "#000",
  },
  socialButtonText: {
    color: Colors.light.text,
    fontSize: 16,
    fontWeight: "600",
  },
  appleButtonText: {
    color: "#fff",
  },
  toggleContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 24,
  },
  toggleText: {
    color: Colors.light.textSecondary,
    fontSize: 15,
  },
  toggleLink: {
    color: Colors.light.primary,
    fontSize: 15,
    fontWeight: "600",
  },
  backButton: {
    marginTop: 16,
    alignItems: "center",
  },
  backButtonText: {
    color: Colors.light.textSecondary,
    fontSize: 15,
  },
});
