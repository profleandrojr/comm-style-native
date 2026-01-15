import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RESULT_CONTENT, RESULT_IMAGES } from "../constants/results";
import { COLORS, SPACING } from "../constants/theme";

const { width } = Dimensions.get("window");

export default function ResultsScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState<string | null>(null);
  const [scores, setScores] = useState({ red: 0, blue: 0, green: 0 });

  useEffect(() => {
    calculateResults();
  }, []);

  const calculateResults = async () => {
    try {
      const savedAns = await AsyncStorage.getItem("quizAnswers");
      if (!savedAns) {
        // Fallback if no data (shouldn't happen)
        setResult("rainbow");
        setLoading(false);
        return;
      }

      const answers = JSON.parse(savedAns);

      // Calculate Totals
      const totals = answers.reduce(
        (acc: any, ans: any) => ({
          red: acc.red + (ans.red || 0),
          blue: acc.blue + (ans.blue || 0),
          green: acc.green + (ans.green || 0),
        }),
        { red: 0, blue: 0, green: 0 }
      );

      setScores(totals);

      // Determine Winner Logic
      const sorted = [
        { color: "red", score: totals.red },
        { color: "blue", score: totals.blue },
        { color: "green", score: totals.green },
      ].sort((a, b) => b.score - a.score);

      // Tie Logic (Rainbow)
      if (sorted[0].score === sorted[1].score) {
        setResult("rainbow");
      } else {
        setResult(sorted[0].color);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleRestart = async () => {
    // Clear data so they start fresh
    await AsyncStorage.multiRemove(["quizAnswers", "quizCurrentQuestion"]);
    router.dismissAll(); // Clear stack
    router.replace("/"); // Go to Welcome
  };

  if (loading || !result) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  const content = RESULT_CONTENT[result];
  const imageSource = RESULT_IMAGES[result];

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Result Header */}
        <Text style={styles.headerTitle}>Your Style Is...</Text>

        <View style={styles.imageContainer}>
          <Image
            source={imageSource}
            style={styles.resultImage}
            resizeMode="contain"
          />
        </View>

        {/* Result Card */}
        <View style={styles.card}>
          <Text
            style={[
              styles.resultTitle,
              {
                color: COLORS[result as keyof typeof COLORS] || COLORS.primary,
              },
            ]}
          >
            {content.title}
          </Text>
          <Text style={styles.resultDesc}>{content.description}</Text>

          {/* Pro Tip Section */}
          <View style={styles.tipBox}>
            <Text style={styles.tipTitle}>💡 Neuromarketing Tip:</Text>
            <Text style={styles.tipText}>{content.advice}</Text>
          </View>
        </View>

        {/* Score Breakdown (Optional, but users love data) */}
        <View style={styles.statsContainer}>
          <Text style={styles.statsTitle}>Your Profile Mix</Text>
          <View style={styles.barRow}>
            <Text style={styles.label}>Red</Text>
            <View
              style={[
                styles.bar,
                { width: scores.red * 2, backgroundColor: COLORS.red },
              ]}
            />
            <Text style={styles.score}>{scores.red}</Text>
          </View>
          <View style={styles.barRow}>
            <Text style={styles.label}>Blue</Text>
            <View
              style={[
                styles.bar,
                { width: scores.blue * 2, backgroundColor: COLORS.blue },
              ]}
            />
            <Text style={styles.score}>{scores.blue}</Text>
          </View>
          <View style={styles.barRow}>
            <Text style={styles.label}>Green</Text>
            <View
              style={[
                styles.bar,
                { width: scores.green * 2, backgroundColor: COLORS.green },
              ]}
            />
            <Text style={styles.score}>{scores.green}</Text>
          </View>
        </View>
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.restartButton} onPress={handleRestart}>
          <Text style={styles.restartText}>Retake Assessment</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  scrollContent: {
    padding: SPACING.m,
    paddingBottom: 100,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: "RedHatDisplay",
    fontWeight: "bold",
    color: COLORS.text,
    marginTop: SPACING.m,
  },

  imageContainer: {
    marginVertical: SPACING.l,
    alignItems: "center",
    justifyContent: "center",
  },
  resultImage: { width: width * 0.6, height: width * 0.6 },

  card: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: SPACING.l,
    width: "100%",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
  },
  resultTitle: {
    fontSize: 28,
    fontFamily: "RedHatDisplay",
    fontWeight: "800",
    textAlign: "center",
    marginBottom: SPACING.s,
  },
  resultDesc: {
    fontSize: 16,
    fontFamily: "RedHatDisplay",
    color: COLORS.text,
    textAlign: "center",
    lineHeight: 24,
    marginBottom: SPACING.l,
  },

  tipBox: {
    backgroundColor: COLORS.secondary,
    padding: SPACING.m,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.accent,
  },
  tipTitle: { fontWeight: "bold", color: COLORS.text, marginBottom: 4 },
  tipText: {
    fontSize: 14,
    fontStyle: "italic",
    color: COLORS.text,
    lineHeight: 20,
  },

  statsContainer: { marginTop: SPACING.xl, width: "100%" },
  statsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: SPACING.m,
    color: COLORS.gray,
  },
  barRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SPACING.s,
  },
  label: { width: 50, fontWeight: "600", color: COLORS.text },
  bar: { height: 12, borderRadius: 6, marginHorizontal: 10 },
  score: { fontWeight: "bold", color: COLORS.text },

  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: SPACING.m,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.lightGray,
  },
  restartButton: {
    backgroundColor: COLORS.primary,
    padding: SPACING.m,
    borderRadius: 12,
    alignItems: "center",
  },
  restartText: { color: "white", fontWeight: "bold", fontSize: 16 },
});
