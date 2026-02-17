import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { ChecklistItem } from "@/components/ui/ChecklistItem";
import { FloatingActionButton } from "@/components/ui/FloatingActionButton";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Colors } from "@/constants/theme";
<<<<<<< HEAD
import { router } from "expo-router";
=======
import { useRouter } from "expo-router";
>>>>>>> ee1f09dc9d9272baa72613552a5631edf656b309
import { useState } from "react";
import {
  FlatList,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Define Task Set Types and Data
type TaskItem = {
  id: string;
  text: string;
  completed: boolean;
};

type TaskSet = {
  id: string;
  title: string; // e.g., "Weekend Reflection"
  badge: string; // e.g., "Daily Focus"
  progress: number; // 0-100
  tasks: TaskItem[];
};

const TASK_SETS: TaskSet[] = [
  {
    id: "weekend",
    title: "Weekend\nReflection",
    badge: "Daily Focus",
    progress: 40,
    tasks: [
      { id: "1", text: "Upload a photo from 2018", completed: true },
      { id: "2", text: "Write 3 lines about the weather", completed: false },
      { id: "3", text: "Call a family member", completed: false },
    ],
  },
  {
    id: "work",
    title: "Work\nProjects",
    badge: "Priority",
    progress: 75,
    tasks: [
      { id: "1", text: "Review team PRs", completed: true },
      { id: "2", text: "Prepare presentation slides", completed: true },
      { id: "3", text: "Email client updates", completed: false },
      { id: "4", text: "Update linear tickets", completed: false },
    ],
  },
  {
    id: "wellness",
    title: "Morning\nWellness",
    badge: "Health",
    progress: 20,
    tasks: [
      { id: "1", text: "Drink 500ml water", completed: true },
      { id: "2", text: "10 min meditation", completed: false },
      { id: "3", text: "Stretch routine", completed: false },
    ],
  },
];


export default function HomeScreen() {
  const [selectedSetId, setSelectedSetId] = useState<string>("weekend");
  const [modalVisible, setModalVisible] = useState(false);
  const router = useRouter();

  // In a real app with persistence, we would load from AsyncStorage here.
  // useEffect(() => { loadFromStorage() }, []);
  // useEffect(() => { saveToStorage(selectedSetId) }, [selectedSetId]);

  const currentSet =
    TASK_SETS.find((s) => s.id === selectedSetId) || TASK_SETS[0];

  const handleSelectSet = (id: string) => {
    setSelectedSetId(id);
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Section */}
        <View style={styles.header}>
          <View>
            <TouchableOpacity
              style={styles.dropdownTrigger}
              onPress={() => setModalVisible(true)}
              activeOpacity={0.7}
            >
              <Text style={styles.dateText}>
                {TASK_SETS.find(
                  (s) => s.id === selectedSetId,
                )?.badge.toUpperCase() || "SELECT SET"}
              </Text>
              <IconSymbol
                name="chevron.down"
                size={16}
                color="#9CA3AF"
                style={{ marginLeft: 4, marginTop: -2 }}
              />
            </TouchableOpacity>

            <Text style={styles.greetingText}>
              Good morning,{"\n"}
              <Text style={styles.nameText}>Alex</Text>
            </Text>
          </View>

<<<<<<< HEAD
          <Avatar
            source={{
              uri: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop",
            }}
            showStatus
            statusColor={Colors.light.primary}
            onPress={() => router.push("/profile")}
          />
=======
          <TouchableOpacity onPress={() => {
            router.push('/profile');
          }} activeOpacity={0.7}>
            <Avatar
              source={{
                uri: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop",
              }}
              showStatus
              statusColor={Colors.light.primary}
            />
          </TouchableOpacity>
>>>>>>> ee1f09dc9d9272baa72613552a5631edf656b309
        </View>

        {/* Main Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Badge text={currentSet.badge} />
            {/* Decorative Plant Icon */}
            <IconSymbol
              name="leaf.fill"
              size={80}
              color="#E0E0E0"
              style={styles.plantIcon}
            />
          </View>

          <Text style={styles.cardTitle}>{currentSet.title}</Text>

          {/* Progress Section */}
          <ProgressBar
            progress={currentSet.progress}
            showValue
            label="Progress"
            style={{ marginBottom: 32 }}
          />

          {/* Checklist Items */}
          <View style={styles.checklistContainer}>
            {currentSet.tasks.map((task) => (
              <ChecklistItem
                key={task.id}
                text={task.text}
                completed={task.completed}
                onToggle={() => {
                  // In a real app, toggle logic here
                  console.log("Toggle task", task.id);
                }}
              />
            ))}
          </View>
        </View>

        {/* Quote Section */}
        <Text style={styles.quoteText}>
          "Nostalgia is a file that removes the rough edges{"\n"}from the good
          old days."
        </Text>
      </ScrollView>

      {/* Floating Action Button */}
      <FloatingActionButton
        style={styles.fab}
        onPress={() => router.push("/addnewmemory")}
      />

      {/* Dropdown Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Select Task Set</Text>
              <FlatList
                data={TASK_SETS}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={[
                      styles.modalItem,
                      item.id === selectedSetId && styles.modalItemSelected,
                    ]}
                    onPress={() => handleSelectSet(item.id)}
                  >
                    <Text
                      style={[
                        styles.modalItemText,
                        item.id === selectedSetId &&
                          styles.modalItemTextSelected,
                      ]}
                    >
                      {item.title.replace("\n", " ")}
                    </Text>
                    {item.id === selectedSetId && (
                      <IconSymbol
                        name="checkmark.circle.fill"
                        size={20}
                        color={Colors.light.primary}
                      />
                    )}
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 100, // Space for FAB
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginTop: 20,
    marginBottom: 32,
  },
  dropdownTrigger: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  dateText: {
    fontSize: 13,
    color: "#9CA3AF", // gray-400
    fontWeight: "600",
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  greetingText: {
    fontSize: 32,
    color: "#1F2937", // gray-800
    fontWeight: "700",
    lineHeight: 38,
  },
  nameText: {
    color: Colors.light.primary, // Gold
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 32,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 2,
    marginBottom: 40,
    position: "relative",
    overflow: "hidden",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  plantIcon: {
    position: "absolute",
    right: -10,
    top: -10,
    opacity: 0.2,
    transform: [{ rotate: "15deg" }],
  },
  cardTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#111827", // gray-900
    marginBottom: 32,
    lineHeight: 34,
  },
  checklistContainer: {
    gap: 12, // Reduced gap since items have padding
  },
  quoteText: {
    fontStyle: "italic",
    textAlign: "center",
    color: "#9CA3AF", // gray-400
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 20,
  },
  fab: {
    position: "absolute",
    bottom: 30,
    right: 24,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 16,
    textAlign: "center",
    color: "#1F2937",
  },
  modalItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  modalItemSelected: {
    backgroundColor: "#FEF3C7", // Light gold
  },
  modalItemText: {
    fontSize: 16,
    color: "#374151",
    fontWeight: "500",
  },
  modalItemTextSelected: {
    color: Colors.light.primary,
    fontWeight: "700",
  },
});
