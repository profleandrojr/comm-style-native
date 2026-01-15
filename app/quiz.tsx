import React, { useEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { QUESTIONS } from "../constants/questions";
import { COLORS, SPACING } from "../constants/theme";

const SCORES = [0, 3, 7, 10];
const TOTAL_QUESTIONS = QUESTIONS.length;

export default function QuizScreen() {
  const router = useRouter();
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [answers, setAnswers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProgress();
  }, []);

  useEffect(() => {
    if (!loading) saveProgress();
  }, [answers, currentQuestionIdx]);

  const loadProgress = async () => {
    try {
      const savedQ = await AsyncStorage.getItem("quizCurrentQuestion");
      const savedAns = await AsyncStorage.getItem("quizAnswers");
      if (savedQ) setCurrentQuestionIdx(parseInt(savedQ));
      if (savedAns) setAnswers(JSON.parse(savedAns));
      else
        setAnswers(
          Array(TOTAL_QUESTIONS).fill({ red: null, blue: null, green: null })
        );
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const saveProgress = async () => {
    await AsyncStorage.setItem(
      "quizCurrentQuestion",
      currentQuestionIdx.toString()
    );
    await AsyncStorage.setItem("quizAnswers", JSON.stringify(answers));
  };

  const handleScoreSelect = (color: string, score: number) => {
    const newAnswers = [...answers];
    const currentAnswer = newAnswers[currentQuestionIdx] || {
      red: null,
      blue: null,
      green: null,
    };
    newAnswers[currentQuestionIdx] = { ...currentAnswer, [color]: score };
    setAnswers(newAnswers);
  };

  const isScoreTaken = (color: string, score: number) => {
    const currentAnswer = answers[currentQuestionIdx];
    if (!currentAnswer) return false;
    return Object.keys(currentAnswer).some(
      (key) => key !== color && currentAnswer[key] === score
    );
  };

  const isValid = () => {
    const current = answers[currentQuestionIdx];
    if (!current) return false;
    const values = [current.red, current.blue, current.green].filter(
      (v) => v !== null
    );
    return values.length === 3 && new Set(values).size === 3;
  };

  const handleNext = () => {
    if (isValid()) {
      if (currentQuestionIdx < TOTAL_QUESTIONS - 1) {
        setCurrentQuestionIdx(currentQuestionIdx + 1);
      } else {
        router.replace("/results");
      }
    } else {
      Alert.alert(
        "Action Required",
        "Please assign unique scores (0, 3, 7, 10) to all options."
      );
    }
  };

  if (loading) return <View style={styles.container} />;

  const currentQData = QUESTIONS[currentQuestionIdx];
  const currentAnswer = answers[currentQuestionIdx] || {};

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      {/* Progress Bar */}
      <View style={styles.header}>
        <View style={styles.progressBarBg}>
          <View
            style={[
              styles.progressBarFill,
              {
                width: `${((currentQuestionIdx + 1) / TOTAL_QUESTIONS) * 100}%`,
              },
            ]}
          />
        </View>
        <Text style={styles.progressText}>Q{currentQuestionIdx + 1}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.questionText}>{currentQData?.text}</Text>

        <View style={styles.optionsContainer}>
          {currentQData?.options.map((opt) => (
            <View key={opt.color} style={styles.optionCard}>
              <Text style={styles.optionText}>{opt.text}</Text>

              <View style={styles.scoreRow}>
                {SCORES.map((score) => {
                  const isSelected = currentAnswer[opt.color] === score;
                  const taken = isScoreTaken(opt.color, score);
                  return (
                    <TouchableOpacity
                      key={score}
                      style={[
                        styles.scoreCircle,
                        isSelected && {
                          backgroundColor: COLORS.primary,
                          borderColor: COLORS.primary,
                        },
                        taken &&
                          !isSelected && {
                            backgroundColor: "#F5F5F5",
                            borderColor: "#EEEEEE",
                          },
                      ]}
                      disabled={taken && !isSelected}
                      onPress={() => handleScoreSelect(opt.color, score)}
                    >
                      <Text
                        style={[
                          styles.scoreText,
                          isSelected && { color: "white" },
                          taken && !isSelected && { color: "#CCC" },
                        ]}
                      >
                        {score}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.nextButton, !isValid() && { backgroundColor: "#CCC" }]}
          onPress={handleNext}
          disabled={!isValid()}
        >
          <Text style={styles.nextButtonText}>
            {currentQuestionIdx === TOTAL_QUESTIONS - 1
              ? "FINISH"
              : "NEXT QUESTION"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: {
    padding: SPACING.m,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  progressBarBg: {
    flex: 1,
    height: 8,
    backgroundColor: COLORS.lightGray,
    borderRadius: 4,
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: COLORS.accent,
    borderRadius: 4,
  },
  progressText: { fontWeight: "bold", color: COLORS.gray },
  scrollContent: { padding: SPACING.m, paddingBottom: 100 },
  questionText: {
    fontSize: 20,
    fontFamily: "RedHatDisplay",
    fontWeight: "bold",
    color: COLORS.text,
    marginBottom: SPACING.l,
  },
  optionsContainer: { gap: SPACING.m },

  optionCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: SPACING.m,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },

  optionText: {
    fontSize: 16,
    fontFamily: "RedHatDisplay",
    color: COLORS.text,
    marginBottom: SPACING.m,
  },
  scoreRow: { flexDirection: "row", justifyContent: "space-between" },
  scoreCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: COLORS.gray,
    justifyContent: "center",
    alignItems: "center",
  },
  scoreText: { fontSize: 16, fontWeight: "bold", color: COLORS.text },
  footer: {
    padding: SPACING.m,
    borderTopWidth: 1,
    borderTopColor: COLORS.lightGray,
    backgroundColor: COLORS.white,
  },
  nextButton: {
    backgroundColor: COLORS.primary,
    padding: SPACING.m,
    borderRadius: 12,
    alignItems: "center",
  },
  nextButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    letterSpacing: 1,
  },
});
