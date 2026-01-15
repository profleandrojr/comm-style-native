import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
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
import { openSocialLink } from "../utils/openLink";

const { width } = Dimensions.get("window");
const MAX_POSSIBLE_SCORE = 27 * 10; // 27 questions * max 10 points

export default function ResultsScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState<string | null>(null);
  const [scores, setScores] = useState({ red: 0, blue: 0, green: 0 });

  // Animations
  const redAnim = useRef(new Animated.Value(0)).current;
  const blueAnim = useRef(new Animated.Value(0)).current;
  const greenAnim = useRef(new Animated.Value(0)).current;

  // 1. Move calculation logic inside useCallback to fix dependency warning
  const calculateResults = useCallback(async () => {
    try {
      const savedAns = await AsyncStorage.getItem("quizAnswers");
      if (!savedAns) {
        setResult("rainbow");
        setLoading(false);
        return;
      }
      const answers = JSON.parse(savedAns);

      const totals = answers.reduce(
        (acc: any, ans: any) => ({
          red: acc.red + (ans.red || 0),
          blue: acc.blue + (ans.blue || 0),
          green: acc.green + (ans.green || 0),
        }),
        { red: 0, blue: 0, green: 0 }
      );
      setScores(totals);

      const sorted = [
        { color: "red", score: totals.red },
        { color: "blue", score: totals.blue },
        { color: "green", score: totals.green },
      ].sort((a, b) => b.score - a.score);

      if (sorted[0].score === sorted[1].score) {
        setResult("rainbow");
      } else {
        setResult(sorted[0].color);
      }

      setLoading(false);

      // Trigger Animations
      Animated.parallel([
        Animated.timing(redAnim, {
          toValue: totals.red,
          duration: 1000,
          useNativeDriver: false,
        }),
        Animated.timing(blueAnim, {
          toValue: totals.blue,
          duration: 1000,
          useNativeDriver: false,
        }),
        Animated.timing(greenAnim, {
          toValue: totals.green,
          duration: 1000,
          useNativeDriver: false,
        }),
      ]).start();
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  }, [redAnim, blueAnim, greenAnim]);

  useEffect(() => {
    // 2. Small delay to ensure layout is ready before animating
    const timer = setTimeout(() => {
      calculateResults();
    }, 500);
    return () => clearTimeout(timer);
  }, [calculateResults]);

  const handleRestart = async () => {
    await AsyncStorage.multiRemove(["quizAnswers", "quizCurrentQuestion"]);
    router.dismissAll();
    router.replace("/");
  };

  const handleShare = () => {
    if (!result) return;
    const content = RESULT_CONTENT[result];
    const text = `¡Soy un Negociador ${content.title}! 🔴🔵🟢\n\nDescubre tu estilo con la App de Perfil de Comunicación de @profleandrojr.\n\nMetodología de Luis Gerald Riffo.`;
    const encodedText = encodeURIComponent(text);

    openSocialLink(
      `twitter://post?message=${encodedText}`,
      `https://twitter.com/intent/tweet?text=${encodedText}`
    );
  };

  if (loading || !result) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={styles.loadingText}>Analizando tu perfil...</Text>
      </View>
    );
  }

  const content = RESULT_CONTENT[result];
  const imageSource = RESULT_IMAGES[result];

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.headerTitle}>Tu Estilo Es...</Text>

        <View style={styles.imageContainer}>
          <Image
            source={imageSource}
            style={styles.resultImage}
            resizeMode="contain"
          />
        </View>

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

          <View style={styles.tipBox}>
            <Text style={styles.tipTitle}>💡 Neurotip:</Text>
            <Text style={styles.tipText}>{content.advice}</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
          <Text style={styles.shareButtonText}>
            Publicar Resultado en X (Twitter)
          </Text>
        </TouchableOpacity>

        <View style={styles.statsContainer}>
          <Text style={styles.statsTitle}>Tu Mezcla de Perfil</Text>

          {/* Red Bar */}
          <View style={styles.barRow}>
            <Text style={styles.label}>Rojo</Text>
            <View style={styles.barTrack}>
              <Animated.View
                style={[
                  styles.bar,
                  {
                    backgroundColor: COLORS.red,
                    width: redAnim.interpolate({
                      inputRange: [0, MAX_POSSIBLE_SCORE],
                      outputRange: ["0%", "100%"],
                    }),
                  },
                ]}
              />
            </View>
            <Text style={styles.score}>{scores.red}</Text>
          </View>

          {/* Blue Bar */}
          <View style={styles.barRow}>
            <Text style={styles.label}>Azul</Text>
            <View style={styles.barTrack}>
              <Animated.View
                style={[
                  styles.bar,
                  {
                    backgroundColor: COLORS.blue,
                    width: blueAnim.interpolate({
                      inputRange: [0, MAX_POSSIBLE_SCORE],
                      outputRange: ["0%", "100%"],
                    }),
                  },
                ]}
              />
            </View>
            <Text style={styles.score}>{scores.blue}</Text>
          </View>

          {/* Green Bar */}
          <View style={styles.barRow}>
            <Text style={styles.label}>Verde</Text>
            <View style={styles.barTrack}>
              <Animated.View
                style={[
                  styles.bar,
                  {
                    backgroundColor: COLORS.green,
                    width: greenAnim.interpolate({
                      inputRange: [0, MAX_POSSIBLE_SCORE],
                      outputRange: ["0%", "100%"],
                    }),
                  },
                ]}
              />
            </View>
            <Text style={styles.score}>{scores.green}</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.restartButton} onPress={handleRestart}>
          <Text style={styles.restartText}>Repetir Evaluación</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.background,
  },
  loadingText: {
    marginTop: 20,
    fontSize: 18,
    fontFamily: "RedHatDisplay",
    color: COLORS.gray,
  },
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
  shareButton: {
    marginTop: SPACING.l,
    backgroundColor: "#000000",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 30,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  shareButtonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16,
    fontFamily: "RedHatDisplay",
  },
  statsContainer: { marginTop: SPACING.xl, width: "100%" },
  statsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: SPACING.m,
    color: COLORS.gray,
  },

  // FIXED BAR STYLES
  barRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SPACING.m,
    width: "100%",
  },
  label: { width: 50, fontWeight: "600", color: COLORS.text },
  barTrack: {
    flex: 1,
    height: 12,
    backgroundColor: COLORS.lightGray,
    borderRadius: 6,
    marginHorizontal: 10,
    overflow: "hidden",
  },
  bar: { height: "100%", borderRadius: 6 },
  score: {
    width: 30,
    fontWeight: "bold",
    color: COLORS.text,
    textAlign: "right",
  },

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
