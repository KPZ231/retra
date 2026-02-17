import AsyncStorage from "@react-native-async-storage/async-storage";

export const TOKEN_KEY = "auth_token";
export const USER_KEY = "user_data";

export interface User {
  id: string;
  email: string;
  name?: string | null;
}

export interface AuthResponse {
  token: string;
  user: User;
}

// Save auth data
export const saveAuthData = async (token: string, user: User) => {
  try {
    await AsyncStorage.setItem(TOKEN_KEY, token);
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
  } catch (error) {
    console.error("Error saving auth data:", error);
  }
};

// Get auth token
export const getAuthToken = async (): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem(TOKEN_KEY);
  } catch (error) {
    console.error("Error getting auth token:", error);
    return null;
  }
};

// Get user data
export const getUserData = async (): Promise<User | null> => {
  try {
    const userData = await AsyncStorage.getItem(USER_KEY);
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error("Error getting user data:", error);
    return null;
  }
};

// Clear auth data (logout)
export const clearAuthData = async () => {
  try {
    await AsyncStorage.removeItem(TOKEN_KEY);
    await AsyncStorage.removeItem(USER_KEY);
  } catch (error) {
    console.error("Error clearing auth data:", error);
  }
};

// Check if user is authenticated
export const isAuthenticated = async (): Promise<boolean> => {
  const token = await getAuthToken();
  return !!token;
};
