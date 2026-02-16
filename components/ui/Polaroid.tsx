import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

interface PolaroidProps {
  imageUri: string;
  caption: string;
  tilt?: "left" | "right";
}

export function Polaroid({ imageUri, caption, tilt = "left" }: PolaroidProps) {
  return (
    <View style={[styles.polaroid, tilt === "left" ? styles.tiltLeft : styles.tiltRight]}>
      <Image source={{ uri: imageUri }} style={styles.image} />
      <Text style={styles.caption}>{caption}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  polaroid: {
    backgroundColor: '#fff',
    padding: 8,
    alignItems: 'center',
    width: '48%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 1,
    marginBottom: 4,
  },
  tiltLeft: {
    transform: [{ rotate: '-1deg' }],
  },
  tiltRight: {
    transform: [{ rotate: '1deg' }],
  },
  image: {
    width: '100%',
    height: 250,
    marginBottom: 6,
  },
  caption: {
    fontSize: 13,
    color: '#7C6F57',
    fontStyle: 'italic',
    fontWeight: '500',
  },
});
