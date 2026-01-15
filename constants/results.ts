// Static Image Mapping (Crucial for React Native)
export const RESULT_IMAGES: Record<string, any> = {
  red: require("../assets/images/red.png"),
  blue: require("../assets/images/blue.png"),
  green: require("../assets/images/green.png"),
  rainbow: require("../assets/images/rainbow.png"),
};

// The Content Logic
export const RESULT_CONTENT: Record<string, any> = {
  red: {
    title: "Hierarchical (Red)",
    description:
      "You focus on action, results, and speed. You are direct and value efficiency above all else.",
    advice:
      "Practice patience. Sometimes building the relationship (Blue) or analyzing the details (Green) can lead to a better long-term deal than just a quick win.",
  },
  blue: {
    title: "Visionary (Blue)",
    description:
      "You focus on people, relationships, and the 'big picture'. Harmony is your priority.",
    advice:
      "Don't be afraid of conflict. Ensure you aren't sacrificing your own interests just to keep everyone happy. Use data (Green) to back up your feelings.",
  },
  green: {
    title: "Pragmatic (Green)",
    description:
      "You focus on ideas, processes, and analysis. You value logic, data, and accuracy.",
    advice:
      "Watch out for 'Analysis Paralysis'. At some point, you need to stop calculating and start acting (Red). Connect with the human side (Blue) of the deal.",
  },
  rainbow: {
    title: "Situational (Rainbow)",
    description:
      "You are a chameleon! You adapt your style based on the situation.",
    advice:
      "This is a superpower, but be careful not to seem inconsistent. Make sure your core values remain clear regardless of which 'hat' you are wearing.",
  },
};
