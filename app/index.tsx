import { useRouter } from "expo-router";
import React from "react";
import {
  Dimensions,
  Image,
  //   SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { COLORS } from "../constants/theme";

const { width } = Dimensions.get("window");

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER IMAGE / ILLUSTRATION */}
      <View style={styles.headerContainer}>
        <Image
          source={require("../assets/images/icon.png")}
          style={styles.heroImage}
          resizeMode="contain"
        />
      </View>

      {/* TEXT CONTENT */}
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Negotiation Style Profile</Text>

        <Text style={styles.subtitle}>
          Are you Hierarchical, Visionary, or Pragmatic? Discover your style in
          5 minutes.
        </Text>

        {/* START BUTTON */}
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.8}
          onPress={() => alert("Quiz Screen coming next!")}
        >
          <Text style={styles.buttonText}>Start Assessment</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background || "#FFFFFF", // Fallback if theme isn't loaded
  },
  headerContainer: {
    flex: 0.55, // Takes top 55% of screen
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.secondary || "#F0F4F8", // Subtle background for image
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    overflow: "hidden",
  },
  heroImage: {
    width: width * 0.8,
    height: width * 0.8,
  },
  contentContainer: {
    flex: 0.45, // Takes bottom 45%
    padding: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontFamily: "RedHatDisplay", // <--- YOUR NEW FONT
    fontSize: 32,
    fontWeight: "800",
    color: COLORS.text || "#1A1A1A",
    textAlign: "center",
    marginBottom: 15,
  },
  subtitle: {
    fontFamily: "RedHatDisplay",
    fontSize: 16,
    color: COLORS.gray || "#666666",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 40,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: COLORS.primary || "#2C3E50",
    width: "100%",
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: "center",
    shadowColor: COLORS.primary || "#2C3E50",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8, // Android shadow
  },
  buttonText: {
    fontFamily: "RedHatDisplay",
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
});
