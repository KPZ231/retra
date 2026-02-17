import { Fonts } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import { router } from "expo-router";
import { useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Image,
    Platform,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function AddNewMemory() {
  const [image, setImage] = useState<string | null>(null);
  const [caption, setCaption] = useState("");
  const [pickedLocation, setPickedLocation] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Date state
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Location state
  const [isLocationLoading, setIsLocationLoading] = useState(false);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSave = async () => {
    if (!image) {
      // In a real app, show an alert
      return;
    }
    setIsSaving(true);
    // Simulate network request
    setTimeout(() => {
      setIsSaving(false);
      router.back();
    }, 1500);
  };

  const onChangeDate = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    if (Platform.OS === "android") {
      setShowDatePicker(false);
    }
    setDate(currentDate);
  };

  const handleGetLocation = async () => {
    setIsLocationLoading(true);
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Denied",
          "Allow camera access to add location.",
        );
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      let addressMatches = await Location.reverseGeocodeAsync(location.coords);

      if (addressMatches && addressMatches.length > 0) {
        const place = addressMatches[0];
        const parts = [
          place.city,
          place.region,
          place.country,
          place.name,
        ].filter((p) => p && p.length > 0);

        // Take unique parts to avoid "Warsaw, Warsaw"
        const uniqueParts = [...new Set(parts)];

        const locationString = uniqueParts.slice(0, 2).join(", ");
        setPickedLocation(locationString || "Unknown Place");
      } else {
        setPickedLocation(
          `${location.coords.latitude.toFixed(2)}, ${location.coords.longitude.toFixed(2)}`,
        );
      }
    } catch (error) {
      Alert.alert("Error", "Could not fetch location.");
    } finally {
      setIsLocationLoading(false);
    }
  };

  const isToday = (d: Date) => {
    const today = new Date();
    return (
      d.getDate() === today.getDate() &&
      d.getMonth() === today.getMonth() &&
      d.getFullYear() === today.getFullYear()
    );
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.cancelButton}
        >
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>New Memory</Text>
        <View style={styles.headerRight} />
      </View>

      <View style={styles.content}>
        <View style={styles.card}>
          <TouchableOpacity
            style={styles.imageContainer}
            onPress={pickImage}
            activeOpacity={0.9}
          >
            {image ? (
              <Image source={{ uri: image }} style={styles.image} />
            ) : (
              <View style={styles.placeholderContainer}>
                <Ionicons name="camera-outline" size={40} color="#9CA3AF" />
                <Text style={styles.placeholderText}>TAP TO UPLOAD</Text>
              </View>
            )}
            {!image && (
              <View style={styles.plusOverlay}>
                <Ionicons name="add" size={16} color="white" />
              </View>
            )}
          </TouchableOpacity>

          <TextInput
            style={styles.captionInput}
            placeholder="Write a thought..."
            placeholderTextColor="#D1D5DB"
            value={caption}
            onChangeText={setCaption}
            multiline
            maxLength={100}
          />
          <View style={styles.divider} />
        </View>

        <View style={styles.metaRow}>
          <TouchableOpacity
            style={styles.metaButton}
            onPress={() => setShowDatePicker(true)}
          >
            <Ionicons
              name="calendar-outline"
              size={20}
              color={!isToday(date) ? "#111827" : "#9CA3AF"}
            />
            <Text
              style={[styles.metaText, !isToday(date) && styles.metaTextActive]}
            >
              {formatDate(date)}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.metaButton}
            onPress={handleGetLocation}
            disabled={isLocationLoading}
          >
            {isLocationLoading ? (
              <ActivityIndicator size="small" color="#9CA3AF" />
            ) : (
              <>
                <Ionicons
                  name="location-outline"
                  size={20}
                  color={pickedLocation ? "#111827" : "#9CA3AF"}
                />
                <Text
                  style={[
                    styles.metaText,
                    pickedLocation && styles.metaTextActive,
                  ]}
                >
                  {pickedLocation || "Add Location"}
                </Text>
              </>
            )}
          </TouchableOpacity>
        </View>

        {showDatePicker && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={onChangeDate}
          />
        )}

        <View style={{ flex: 1 }} />

        <TouchableOpacity
          style={[styles.saveButton, !image && styles.saveButtonDisabled]}
          onPress={handleSave}
          disabled={!image || isSaving}
        >
          {isSaving ? (
            <ActivityIndicator color="#8B7355" />
          ) : (
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
            >
              <Ionicons name="download-outline" size={20} color="#8B7355" />
              <Text style={styles.saveButtonText}>Save Memory</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  cancelButton: {
    padding: 8,
    marginLeft: -8,
  },
  cancelText: {
    fontSize: 16,
    color: "#6B7280",
    fontWeight: "500",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
    fontFamily: Fonts.rounded,
  },
  headerRight: {
    width: 60,
  },
  content: {
    padding: 24,
    flex: 1,
    alignItems: "center",
  },
  card: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
    marginBottom: 32,
    width: "100%",
    aspectRatio: 0.85,
    alignItems: "center",
  },
  imageContainer: {
    width: "100%",
    aspectRatio: 1,
    backgroundColor: "#F3F4F6",
    marginBottom: 24,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  placeholderContainer: {
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  placeholderText: {
    color: "#9CA3AF",
    fontSize: 12,
    letterSpacing: 1.5,
    fontWeight: "600",
  },
  plusOverlay: {
    position: "absolute",
    top: "40%",
    right: "42%",
    backgroundColor: "#9CA3AF",
    borderRadius: 8,
    width: 16,
    height: 16,
    alignItems: "center",
    justifyContent: "center",
    opacity: 0,
  },
  captionInput: {
    fontSize: 16,
    color: "#374151",
    textAlign: "center",
    width: "100%",
    paddingVertical: 8,
    fontFamily: Fonts.rounded,
  },
  divider: {
    width: 40,
    height: 2,
    backgroundColor: "#F3F4F6",
    marginTop: 12,
  },
  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 16,
  },
  metaButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  metaText: {
    color: "#9CA3AF",
    fontSize: 14,
    fontWeight: "500",
  },
  metaTextActive: {
    color: "#111827", // Darker color when selected
    fontWeight: "600",
  },
  saveButton: {
    backgroundColor: "#EAD9B6",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 30,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    shadowColor: "#EAD9B6",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  saveButtonDisabled: {
    opacity: 0.7,
  },
  saveButtonText: {
    color: "#8B7355",
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
});
