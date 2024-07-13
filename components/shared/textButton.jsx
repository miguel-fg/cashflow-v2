import React from "react";
import { Pressable, StyleSheet } from "react-native";
import StyledText from "./styledText";

const TextButton = React.forwardRef((props, ref) => {
  const { variant, style, children, onPress } = props;

  const buttonVar = getButtonVariant(variant);
  const textStyle = getTextStyle(variant);

  return (
    <Pressable
      ref={ref}
      style={[styles.buttonDefault, buttonVar, style]}
      onPress={onPress}
    >
      <StyledText weight="medium" type="title" variant={textStyle}>
        {children}
      </StyledText>
    </Pressable>
  );
});

const getTextStyle = (variant) => {
  switch (variant) {
    case "primary":
      return "light";
    case "secondary":
      return "dark";
    case "danger":
      return "light";
    case "success":
      return "light";
  }
};

const getButtonVariant = (variant) => {
  switch (variant) {
    case "primary":
      return styles["buttonPrimary"];
    case "secondary":
      return styles["buttonSecondary"];
    case "danger":
      return styles["buttonDanger"];
    case "success":
      return styles["buttonSuccess"];
  }
};

const styles = StyleSheet.create({
  buttonDefault: {
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: "center",
    elevation: 7,
    shadowColor: "#416788",
    shadowOffset: { width: -2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
  buttonPrimary: {
    backgroundColor: "#416788",
    borderColor: "#416788",
    borderWidth: 3,
  },
  buttonSecondary: {
    backgroundColor: "#EEF0F2",
    borderColor: "#416788",
    borderWidth: 3,
  },
  buttonDanger: {
    backgroundColor: "#FE616F",
    borderColor: "#FE616F",
    borderWidth: 3,
  },
  buttonSuccess: {
    backgroundColor: "#62A87C",
    borderColor: "#62A87C",
    borderWidth: 3,
  },
});

export default TextButton;
