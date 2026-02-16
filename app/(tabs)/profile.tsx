import { Polaroid } from "@/components/ui/Polaroid";
import { StatsRow } from "@/components/ui/StatsRow";
import { Colors, Fonts } from "@/constants/theme";
import { Ionicons } from '@expo/vector-icons';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function ProfileScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={{paddingBottom: 32}}>
      {/* Header */}
      <View style={styles.headerRow}>
        <View style={{ flex: 1 }} />
        <Text style={styles.headerTitle}>PROFILE</Text>
        <View style={{ flex: 1 }} />
      </View>

      {/* Avatar and Name */}
      <View style={styles.avatarSection}>
        <View style={styles.avatarWrapper}>
          <Image
            source={{ uri: 'https://randomuser.me/api/portraits/men/44.jpg' }}
            style={styles.avatar}
          />
        </View>
        <Text style={styles.name}>Alex</Text>
        <View style={styles.premiumRow}>
          <Ionicons name="star" size={16} color="#EAB308" style={{marginRight: 4}} />
          <Text style={styles.premiumText}>PREMIUM MEMBER</Text>
        </View>
      </View>

      {/* Stats */}
      <StatsRow stats={[
        { value: 128, label: 'MEMORIES' },
        { value: 12, label: 'CHALLENGES' },
        { value: 4, label: 'YEARS' },
      ]} />

      {/* My Collection */}
      <View style={styles.collectionSection}>
        <View style={styles.collectionHeader}>
          <Text style={styles.collectionTitle}>MY COLLECTION</Text>
          <TouchableOpacity>
            <Text style={styles.viewAll}>VIEW ALL</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.collectionGrid}>
          <Polaroid
            imageUri="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"
            caption="Summer '22"
            tilt="left"
          />
          <Polaroid
            imageUri="https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80"
            caption="Morning Walk"
            tilt="right"
          />
        </View>
        <View style={styles.collectionGrid}>
          <Polaroid
            imageUri="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80"
            caption="The Coast"
            tilt="left"
          />
          <Polaroid
            imageUri="https://images.unsplash.com/photo-1444065381814-865dc9da92c0?auto=format&fit=crop&w=400&q=80"
            caption="Highlands"
            tilt="right"
          />
        </View>
      </View>

      {/* Menu */}
      <View style={styles.menuSection}>
        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="options-outline" size={20} color="#B6A16B" style={styles.menuIcon} />
          <Text style={styles.menuText}>Preferences</Text>
          <Ionicons name="chevron-forward" size={18} color="#B6A16B" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="lock-closed-outline" size={20} color="#B6A16B" style={styles.menuIcon} />
          <Text style={styles.menuText}>Privacy</Text>
          <Ionicons name="chevron-forward" size={18} color="#B6A16B" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="notifications-outline" size={20} color="#B6A16B" style={styles.menuIcon} />
          <Text style={styles.menuText}>Notifications</Text>
          <Ionicons name="chevron-forward" size={18} color="#B6A16B" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
    paddingTop: 32,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    marginBottom: 8,
  },
  headerTitle: {
    fontFamily: Fonts.rounded,
    fontWeight: '700',
    fontSize: 16,
    letterSpacing: 2,
    color: '#222',
    textAlign: 'center',
    flex: 0,
  },
  avatarSection: {
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 16,
  },
  avatarWrapper: {
    borderWidth: 2,
    borderColor: '#EAD9B6',
    borderRadius: 64,
    padding: 4,
    marginBottom: 8,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: '#222',
    marginBottom: 2,
    fontFamily: Fonts.rounded,
  },
  premiumRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  premiumText: {
    color: '#EAB308',
    fontWeight: '700',
    fontSize: 13,
    letterSpacing: 1,
  },
  // ...existing code...
  collectionSection: {
    marginHorizontal: 16,
    marginBottom: 24,
  },
  collectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  collectionTitle: {
    fontWeight: '700',
    fontSize: 14,
    color: '#B6A16B',
    letterSpacing: 1,
  },
  viewAll: {
    color: '#B6A16B',
    fontWeight: '700',
    fontSize: 12,
    letterSpacing: 1,
  },
  collectionGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  // ...existing code...
  menuSection: {
    marginHorizontal: 8,
    marginTop: 8,
    backgroundColor: 'transparent',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 14,
    marginBottom: 2,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 2,
    elevation: 1,
  },
  menuIcon: {
    marginRight: 16,
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    color: '#7C6F57',
    fontWeight: '600',
  },
});
