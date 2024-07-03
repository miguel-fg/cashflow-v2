import React, { useState, useEffect } from "react";
import { SafeAreaView, StatusBar, View, StyleSheet, Alert } from "react-native";
import StyledText from "../components/shared/styledText";
import StyledTextInput from "../components/shared/styledTextInput";
import TextButton from "../components/shared/textButton";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Link, useNavigation } from "expo-router";
import { initDB, logUsers } from "../db/database.js";
import * as Crypto from "expo-crypto";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [errors, setErrors] = useState({});
  const navigation = useNavigation();

  useEffect(() => {
    validateForm();
  }, [name, email, password, confPassword]);

  const validateForm = () => {
    let errors = {};

    if (!name) {
      errors.name = "Username is required.";
    }

    if (!email) {
      errors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email is invalid";
    }

    if (!password) {
      errors.password = "Password is required.";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters.";
    } else if (password != confPassword) {
      errors.confPassword = "Passwords don't match";
    }

    setErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
  };

  const hashPassword = async (password) => {
    const digest = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      password,
    );

    return digest;
  };

  const handleSubmit = async () => {
    if (isFormValid) {
      try {
        const db = await initDB();
        const existingUser = await db.getFirstAsync(
          "SELECT * FROM users WHERE username = ? OR email = ?",
          [name, email],
        );

        if (existingUser) {
          Alert.alert("Error", "Username or email already exists.");
          return;
        }

        const hashedPassword = await hashPassword(password);

        await db.runAsync(
          "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
          [name, email, hashedPassword],
        );
        logUsers();

        await AsyncStorage.setItem("user", JSON.stringify({ name }));
        navigation.reset({ index: 0, routes: [{ name: "(tabs)" }] });
      } catch (error) {
        Alert.alert("Error", "Failed to register user.");
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
        <View style={styles.textContainer}>
          <StyledText type="header" weight="medium">
            Register
          </StyledText>
          <StyledText type="text">Create your user account</StyledText>
        </View>
        <View style={styles.textInputContainer}>
          <StyledTextInput
            icon="user"
            placeholder="Username"
            password={false}
            text={name}
            setText={setName}
          />
          {errors.name && (
            <StyledText type="text" color="#FE616F">
              {errors.name}
            </StyledText>
          )}
          <StyledTextInput
            icon="email"
            placeholder="Email"
            password={false}
            text={email}
            setText={setEmail}
          />
          {errors.email && (
            <StyledText type="text" color="#FE616F">
              {errors.email}
            </StyledText>
          )}
          <StyledTextInput
            icon="lock"
            placeholder="Password"
            password={true}
            text={password}
            setText={setPassword}
          />
          {errors.password && (
            <StyledText type="text" color="#FE616F">
              {errors.password}
            </StyledText>
          )}
          <StyledTextInput
            icon="lock"
            placeholder="Confirm password"
            password={true}
            text={confPassword}
            setText={setConfPassword}
          />
          {errors.confPassword && (
            <StyledText type="text" color="#FE616F">
              {errors.confPassword}
            </StyledText>
          )}
          <StyledText type="label" align="center">
            By registering you are agreeing to our Terms of use and Privacy
            Policy.
          </StyledText>
        </View>
        <TextButton
          variant="primary"
          style={styles.buttonSize}
          onPress={handleSubmit}
        >
          REGISTER
        </TextButton>
        <StyledText type="label">
          Already have an account?{" "}
          <Link href="/login">
            <StyledText type="label" weight="medium" decoration="underline">
              Login
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
  textContainer: {
    alignItems: "center",
    width: "100%",
    marginTop: 50,
    marginBottom: 30,
  },
  buttonSize: {
    width: "80%",
    marginBottom: 5,
  },
  textInputContainer: {
    width: "80%",
    marginBottom: 100,
  },
});

export default Register;
