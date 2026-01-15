import { Linking } from "react-native";

export const openSocialLink = async (appUrl: string, webUrl: string) => {
  try {
    const canOpen = await Linking.canOpenURL(appUrl);
    if (canOpen) {
      await Linking.openURL(appUrl);
    } else {
      await Linking.openURL(webUrl);
    }
  } catch (error) {
    // If anything fails, fallback to web
    await Linking.openURL(webUrl);
  }
};
