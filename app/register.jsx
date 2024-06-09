import React from "react";
import { SafeAreaView, StatusBar, View, StyleSheet } from "react-native";
import StyledText from "../components/shared/styledText";
import StyledTextInput from "../components/shared/styledTextInput";
import TextButton from "../components/shared/textButton";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Link } from "expo-router";

const Register = () => {
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
          />
          <StyledTextInput icon="email" placeholder="Email" password={false} />
          <StyledTextInput icon="lock" placeholder="Password" password={true} />
          <StyledTextInput
            icon="lock"
            placeholder="Confirm password"
            password={true}
          />
          <StyledText type="label" align="center">
            By registering you are agreeing to our Terms of use and Privacy
            Policy.
          </StyledText>
        </View>
        <TextButton variant="primary" style={styles.buttonSize}>
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
