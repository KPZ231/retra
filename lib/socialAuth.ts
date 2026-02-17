import * as AppleAuthentication from "expo-apple-authentication";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { Platform } from "react-native";
import { AuthResponse, saveAuthData } from "./auth";

WebBrowser.maybeCompleteAuthSession();

const API_URL = __DEV__
  ? "http://localhost:8081"
  : "https://your-production-url.com";

// Google Authentication
export const useGoogleAuth = () => {
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID_ANDROID,
    iosClientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID_IOS,
    webClientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID_WEB,
  });

  const signInWithGoogle = async () => {
    try {
      const result = await promptAsync();

      if (result?.type === "success") {
        const { authentication } = result;

        // Send the token to your backend
        const response = await fetch(`${API_URL}/api/auth/google`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: authentication?.accessToken,
            // You might need to fetch user info from Google API
            email: "", // Get from Google user info endpoint
            name: "", // Get from Google user info endpoint
            googleId: "", // Get from Google user info endpoint
          }),
        });

        const data: AuthResponse = await response.json();

        if (response.ok) {
          await saveAuthData(data.token, data.user);
          return data;
        } else {
          throw new Error("Authentication failed");
        }
      }

      return null;
    } catch (error) {
      console.error("Google sign in error:", error);
      throw error;
    }
  };

  return { signInWithGoogle, request };
};

// Apple Authentication
export const signInWithApple = async () => {
  try {
    if (Platform.OS !== "ios") {
      throw new Error("Apple Sign In is only available on iOS");
    }

    const credential = await AppleAuthentication.signInAsync({
      requestedScopes: [
        AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
        AppleAuthentication.AppleAuthenticationScope.EMAIL,
      ],
    });

    // Send the credential to your backend
    const response = await fetch(`${API_URL}/api/auth/apple`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        identityToken: credential.identityToken,
        email: credential.email,
        name: credential.fullName?.givenName,
        appleId: credential.user,
      }),
    });

    const data: AuthResponse = await response.json();

    if (response.ok) {
      await saveAuthData(data.token, data.user);
      return data;
    } else {
      throw new Error("Authentication failed");
    }
  } catch (error) {
    console.error("Apple sign in error:", error);
    throw error;
  }
};

// Email/Password Registration
export const registerWithEmail = async (
  email: string,
  password: string,
  name?: string,
) => {
  try {
    const response = await fetch(`${API_URL}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, name }),
    });

    const data: AuthResponse = await response.json();

    if (response.ok) {
      await saveAuthData(data.token, data.user);
      return data;
    } else {
      throw new Error(data.error || "Registration failed");
    }
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
};

// Email/Password Login
export const loginWithEmail = async (email: string, password: string) => {
  try {
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data: AuthResponse = await response.json();

    if (response.ok) {
      await saveAuthData(data.token, data.user);
      return data;
    } else {
      throw new Error(data.error || "Login failed");
    }
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};
