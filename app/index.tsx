import { useRouter } from "expo-router";
import React from "react";
import {
  Dimensions,
  Image,
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
      <View style={styles.headerContainer}>
        <Image
          source={require("../assets/images/icon.png")}
          style={styles.heroImage}
          resizeMode="contain"
        />
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.title}>Perfil de Estilo de Negociación</Text>

        <Text style={styles.subtitle}>
          ¿Eres Jerárquico, Visionario o Pragmático? Descubre tu estilo en 5
          minutos.
        </Text>

        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.8}
          onPress={() => router.push("/quiz")}
        >
          <Text style={styles.buttonText}>Iniciar Evaluación</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.aboutLink}
          onPress={() => router.push("/about")}
        >
          <Text style={styles.aboutLinkText}>Acerca de y Créditos</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background || "#FFFFFF" },
  headerContainer: {
    flex: 0.55,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.secondary || "#F0F4F8",
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    overflow: "hidden",
  },
  heroImage: { width: width * 0.8, height: width * 0.8 },
  contentContainer: {
    flex: 0.45,
    padding: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontFamily: "RedHatDisplay",
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
    elevation: 8,
  },
  buttonText: {
    fontFamily: "RedHatDisplay",
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  aboutLink: { marginTop: 20, padding: 10 },
  aboutLinkText: {
    color: COLORS.gray,
    fontSize: 14,
    fontFamily: "RedHatDisplay",
    textDecorationLine: "underline",
  },
});
