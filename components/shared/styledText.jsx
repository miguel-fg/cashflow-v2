import React, { useEffect } from "react";
import { Text, StyleSheet } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import {
  useFonts,
  SpaceGrotesk_400Regular,
  SpaceGrotesk_500Medium,
} from "@expo-google-fonts/space-grotesk";

const StyledText = (props) => {
  const [fontsLoaded] = useFonts({
    SpaceGrotesk_400Regular,
    SpaceGrotesk_500Medium,
  });

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  if (!fontsLoaded) {
    return null;
  } else {
    SplashScreen.hideAsync();
  }

  const baseStyle = getBaseStyle(props.type, props.variant);

  const customStyle = {
    color: props.color || baseStyle.color,
    fontFamily: getFontFamily(props.weight),
    fontSize: baseStyle.fontSize,
    textDecorationLine: props.decoration || "none",
    textAlign: props.align || "auto",
  };

  return <Text style={customStyle}>{props.children}</Text>;
};

const getBaseStyle = (type, variant = "dark") => {
  const variantSuffix = variant === "light" ? "Light" : "Dark";

  switch (type) {
    case "label":
      return styles[`label${variantSuffix}`];
    case "text":
      return styles[`text${variantSuffix}`];
    case "title":
      return styles[`title${variantSuffix}`];
    case "header":
      return styles[`header${variantSuffix}`];
  }
};

const getFontFamily = (weight) => {
  switch (weight) {
    case "medium":
      return "SpaceGrotesk_500Medium";
    case "regular":
    default:
      return "SpaceGrotesk_400Regular";
  }
};

const styles = StyleSheet.create({
  labelLight: {
    color: "#EEF0F2",
    fontSize: 12,
    fontFamily: "SpaceGrotesk_400Regular",
  },
  labelDark: {
    color: "#080E21",
    fontSize: 12,
    fontFamily: "SpaceGrotesk_400Regular",
  },
  textLight: {
    color: "#EEF0F2",
    fontSize: 16,
    fontFamily: "SpaceGrotesk_400Regular",
  },
  textDark: {
    color: "#080E21",
    fontSize: 16,
    fontFamily: "SpaceGrotesk_400Regular",
  },
  titleLight: {
    color: "#EEF0F2",
    fontSize: 20,
    fontFamily: "SpaceGrotesk_400Regular",
  },
  titleDark: {
    color: "#080E21",
    fontSize: 20,
    fontFamily: "SpaceGrotesk_400Regular",
  },
  headerLight: {
    color: "#EEF0F2",
    fontSize: 40,
    fontFamily: "SpaceGrotesk_400Regular",
  },
  headerDark: {
    color: "#080E21",
    fontSize: 40,
    fontFamily: "SpaceGrotesk_400Regular",
  },
});

export default StyledText;
