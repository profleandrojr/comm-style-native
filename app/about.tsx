import { useRouter } from "expo-router";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, SPACING } from "../constants/theme";
import { openSocialLink } from "../utils/openLink";

export default function AboutScreen() {
  const router = useRouter();

  const handleLuisLink = () => {
    openSocialLink(
      "linkedin://in/luisriffo/",
      "https://www.linkedin.com/in/luisriffo/"
    );
  };

  const handleDevLink = () => {
    openSocialLink(
      "twitter://user?screen_name=profleandrojr",
      "https://twitter.com/profleandrojr"
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Text style={styles.backText}>← Volver</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Acerca de</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>🧠 La Metodología</Text>
          <Text style={styles.text}>
            Esta evaluación se basa en el marco de "Técnicas de Negociación
            Avanzada" desarrollado por **Luis Gerald Riffo**.
          </Text>
          <Text style={styles.text}>
            Categoriza los estilos de comunicación en Jerárquico (Rojo),
            Visionario (Azul) y Pragmático (Verde) para ayudar a los
            profesionales a adaptarse y tener éxito.
          </Text>
          <TouchableOpacity onPress={handleLuisLink} style={styles.linkButton}>
            <Text style={styles.linkText}>Seguir a Luis Gerald Riffo</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>💻 El Desarrollador</Text>
          <Text style={styles.text}>
            Diseñado y construido por el **Leandro Junior Alves dos Santos
            (Prof. Leandro Jr)**, combinando ingeniería React Native con
            principios de Neuromarketing para crear evaluaciones imparciales y
            basadas en datos.
          </Text>
          <TouchableOpacity onPress={handleDevLink} style={styles.linkButton}>
            <Text style={styles.linkText}>Seguir a @profleandrojr</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.version}>v1.0.0 (Edición Nativa)</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: SPACING.m,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  backButton: { padding: SPACING.s },
  backText: { fontSize: 16, color: COLORS.primary, fontWeight: "600" },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: SPACING.m,
    color: COLORS.text,
  },
  content: { padding: SPACING.m },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: SPACING.l,
    marginBottom: SPACING.l,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: SPACING.m,
    color: COLORS.primary,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    color: COLORS.text,
    marginBottom: SPACING.m,
    fontFamily: "RedHatDisplay",
  },
  linkButton: { paddingVertical: SPACING.s },
  linkText: { color: COLORS.blue, fontWeight: "bold", fontSize: 16 },
  version: { textAlign: "center", color: COLORS.gray, marginTop: SPACING.xl },
});
