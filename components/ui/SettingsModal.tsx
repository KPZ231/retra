import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

interface SettingsModalProps {
  visible: boolean;
  name: string;
  tempName: string;
  setTempName: (name: string) => void;
  onCancel: () => void;
  onSave: () => void;
}

export function SettingsModal({
  visible,
  name,
  tempName,
  setTempName,
  onCancel,
  onSave,
}: SettingsModalProps) {
  if (!visible) return null;
  return (
    <View style={styles.overlay}>
      <View style={styles.modal}>
        <Text style={styles.title}>Settings</Text>
        <View style={styles.field}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            value={tempName}
            onChangeText={setTempName}
            placeholder="Enter your name"
          />
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={"placeholder@email.com"}
            editable={false}
            placeholder="Change email (coming soon)"
          />
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            style={styles.input}
            value={"+48 123 456 789"}
            editable={false}
            placeholder="Change phone (coming soon)"
          />
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            value={"********"}
            editable={false}
            placeholder="Change password (coming soon)"
            secureTextEntry
          />
        </View>
        <TouchableOpacity style={styles.deleteButton} onPress={() => {}}>
          <Text style={styles.deleteButtonText}>Delete Account (placeholder)</Text>
        </TouchableOpacity>
        <View style={styles.buttonsRow}>
          <TouchableOpacity style={styles.button} onPress={onCancel}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.buttonSave]}
            onPress={onSave}
          >
            <Text style={[styles.buttonText, styles.buttonSaveText]}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    deleteButton: {
      backgroundColor: '#FEE2E2',
      paddingVertical: 12,
      borderRadius: 8,
      marginBottom: 18,
      alignItems: 'center',
    },
    deleteButtonText: {
      color: '#B91C1C',
      fontWeight: '700',
      fontSize: 15,
    },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 100,
  },
  modal: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 24,
    width: "80%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 16,
    textAlign: "center",
    color: "#222",
  },
  field: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#B6A16B",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#EAD9B6",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: "#222",
    backgroundColor: "#FAF9F6",
  },
  buttonsRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 12,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 8,
    backgroundColor: "#F3F4F6",
  },
  buttonText: {
    color: "#7C6F57",
    fontWeight: "600",
    fontSize: 15,
  },
  buttonSave: {
    backgroundColor: "#EAD9B6",
  },
  buttonSaveText: {
    color: "#8B7355",
  },
});
