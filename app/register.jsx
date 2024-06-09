import React from "react";
import { StatusBar, View } from "react-native";
import StyledText from "../components/shared/styledText";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Register = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#EEF0F2" />
      <HookComponent />
      <StyledText type="header">Register</StyledText>
    </>
  );
};

const HookComponent = () => {
  const insets = useSafeAreaInsets();

  return (
    <View style={{ paddingTop: insets.top, backgroundColor: "#EEF0F2" }} />
  );
};

export default Register;
