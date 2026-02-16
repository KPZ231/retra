import { Fonts } from "@/constants/theme";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface StatsRowProps {
  stats: { value: number | string; label: string }[];
}

export function StatsRow({ stats }: StatsRowProps) {
  return (
    <View style={styles.statsRow}>
      {stats.map((stat, idx) => (
        <View style={styles.statBox} key={stat.label}>
          <Text style={styles.statNumber}>{stat.value}</Text>
          <Text style={styles.statLabel}>{stat.label}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  statsRow: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    marginHorizontal: 16,
    marginBottom: 24,
    paddingVertical: 16,
    justifyContent: 'space-around',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 1,
  },
  statBox: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: '700',
    color: '#222',
    marginBottom: 2,
    fontFamily: Fonts.rounded,
  },
  statLabel: {
    fontSize: 12,
    color: '#B6A16B',
    fontWeight: '600',
    letterSpacing: 1,
  },
});
