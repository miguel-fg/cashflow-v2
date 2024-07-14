import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  Image,
  StatusBar,
  Alert,
} from "react-native";
import TextButton from "../components/shared/textButton";
import StyledText from "../components/shared/styledText";
import StyledTextInput from "../components/shared/styledTextInput";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Link, useNavigation } from "expo-router";
import { initDB } from "../db/database.js";
import * as Crypto from "expo-crypto";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = () => {
  const [attempted, setAttempted] = useState(false);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [errors, setErrors] = useState({});
  const navigation = useNavigation();

  useEffect(() => {
    validateForm();
  }, [name, password]);

  const validateForm = () => {
    let errors = {};

    if (!name) {
      errors.name = "Username is required.";
    }

    if (!password) {
      errors.password = "Password is required";
    }

    setErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
  };

  const hashPassword = async (password, salt) => {
    const saltedPW = password + salt;
    const digest = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      saltedPW,
    );

    return digest;
  };

  const handleSubmit = async () => {
    setAttempted(true);

    if (isFormValid) {
      try {
        const db = await initDB();
        const user = await db.getFirstAsync(
          "SELECT * FROM users WHERE username = ?",
          [name],
        );

        if (!user) {
          Alert.alert("Error", "User not found.");
          return;
        }

        const hashedPassword = await hashPassword(password, user.salt);

        if (hashedPassword === user.password) {
          await AsyncStorage.setItem("user", JSON.stringify({ name }));
          navigation.reset({ index: 0, routes: [{ name: "(tabs)" }] });
        } else {
          Alert.alert("Error", "Incorrect password.");
        }
      } catch (error) {
        console.error(error);
        Alert.alert("Error", "Failed to login: ");
      }
    } else {
      console.log("Form has errors. Please correct them.");
    }
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#EEF0F2" />
      <HookComponent />
      <SafeAreaView style={styles.container}>
        <Image
          source={require("../assets/images/welcome.png")}
          style={styles.mainImage}
        />
        <View style={styles.textContainer}>
          <StyledText type="header" weight="medium">
            Welcome Back
          </StyledText>
          <StyledText type="text">Login to your account</StyledText>
        </View>
        <View style={styles.textInputContainer}>
          <View style={styles.inputGroup}>
            <StyledText type="text">Username</StyledText>
            <StyledTextInput
              icon="user"
              placeholder="Mario123"
              password={false}
              text={name}
              setText={setName}
            />
            {attempted && errors.name && (
              <StyledText type="text" color="#FE616F">
                {errors.name}
              </StyledText>
            )}
          </View>
          <View style={styles.inputGroup}>
            <StyledText type="text">Password</StyledText>
            <StyledTextInput
              icon="lock"
              placeholder="******"
              password={true}
              text={password}
              setText={setPassword}
            />
            {attempted && errors.password && (
              <StyledText type="text" color="#FE616F">
                {errors.password}
              </StyledText>
            )}
          </View>
        </View>
        <TextButton
          variant="primary"
          style={styles.buttonSize}
          onPress={handleSubmit}
        >
          LOGIN
        </TextButton>
        <StyledText type="label">
          Don't have an account?{" "}
          <Link href="/register">
            <StyledText type="label" weight="medium" decoration="underline">
              Sign up
            </StyledText>
          </Link>
        </StyledText>
      </SafeAreaView>
    </>
  );
};

const HookComponent = () => {
  const insets = useSafeAreaInsets();

  return (
    <View style={{ paddingTop: insets.top, backgroundColor: "#EEF0F2" }} />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EEF0F2",
    alignItems: "center",
  },
  inputGroup: {
    marginTop: 10,
  },
  mainImage: {
    width: 170,
    height: 200,
    marginTop: 50,
  },
  textContainer: {
    alignItems: "center",
    width: "100%",
    marginTop: 20,
    marginBottom: 20,
  },
  buttonSize: {
    width: "80%",
    marginBottom: 5,
  },
  textInputContainer: {
    width: "80%",
    marginBottom: 50,
  },
});

export default Login;
