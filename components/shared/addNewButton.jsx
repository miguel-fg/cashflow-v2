import React from "react";
import { Pressable, StyleSheet, Image, View } from "react-native";
import StyledText from "./styledText";

const AddNewButton = React.forwardRef((props, ref) => {
  const { style, onPress } = props;

  return (
    <Pressable
      ref={ref}
      style={[styles.buttonDefault, style]}
      onPress={onPress}
    >
      <View style={styles.container}>
        <Image
          source={require("../../assets/images/icons/add_new.png")}
          style={styles.image}
        />
        <StyledText type="title">Add New</StyledText>
      </View>
    </Pressable>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: -1,
    flexDirection: "row",
  },
  buttonDefault: {
    backgroundColor: "#C2CED7",
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: "center",
    shadowOffset: { width: -2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 3,
  },
  image: {
    width: 30,
    height: 30,
    marginRight: 5,
  },
});

export default AddNewButton;
