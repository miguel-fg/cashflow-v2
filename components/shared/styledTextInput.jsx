import React, { useState, useEffect } from "react";
import { View, Image, TextInput, StyleSheet } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import {
  useFonts,
  SpaceGrotesk_400Regular,
} from "@expo-google-fonts/space-grotesk";

const getIconSource = (icon) => {
  switch (icon) {
    case "user":
      return require("../../assets/images/icons/user.png");
    case "lock":
      return require("../../assets/images/icons/password.png");
    case "email":
      return require("../../assets/images/icons/email.png");
  }
};

const StyledTextInput = (props) => {
  const { icon, placeholder, password, text, setText } = props;

  const [fontsLoaded] = useFonts({ SpaceGrotesk_400Regular });

  const iconSource = getIconSource(icon);

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

  return (
    <View style={styles.container}>
      <Image source={iconSource} style={styles.inputIcon} />
      <TextInput
        value={text}
        placeholder={placeholder}
        secureTextEntry={password}
        onChangeText={setText}
        style={styles.input}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#D3DDE6",
    borderRadius: 10,
    borderColor: "#416788",
    borderWidth: 1,
    marginTop: 10,
    alignItems: "center",
    shadowColor: "#416788",
    shadowOffset: { width: -2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 2,
  },
  inputIcon: {
    width: 20,
    height: 20,
    marginLeft: 5,
  },
  input: {
    flex: 1,
    padding: 5,
    fontFamily: "SpaceGrotesk_400Regular",
    fontSize: 16,
  },
});

export default StyledTextInput;
