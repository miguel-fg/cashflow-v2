import React from "react";
import { SafeAreaView, View, StyleSheet, Image, StatusBar } from "react-native";
import TextButton from "../components/shared/textButton";
import StyledText from "../components/shared/styledText";
import StyledTextInput from "../components/shared/styledTextInput";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Link } from "expo-router";

const Login = () => {
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
          <StyledTextInput
            icon="user"
            placeholder="Username"
            password={false}
          />
          <StyledTextInput icon="lock" placeholder="Password" password={true} />
        </View>
        <TextButton variant="primary" style={styles.buttonSize}>
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
  mainImage: {
    width: 200,
    height: 229,
    marginTop: 50,
  },
  textContainer: {
    alignItems: "center",
    width: "100%",
    marginTop: 20,
    marginBottom: 30,
  },
  buttonSize: {
    width: "80%",
    marginBottom: 5,
  },
  textInputContainer: {
    width: "80%",
    marginBottom: 60,
  },
});

export default Login;
