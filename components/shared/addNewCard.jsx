import React from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import StyledText from "./styledText";

const AddNewCard = (props) => {
  const { onPress, toAdd, style } = props;

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.5}>
      <View style={[styles.container, style]}>
        <View style={styles.left}>
          <View style={styles.iconContainer}>
            <Image
              source={require("../../assets/images/icons/add.png")}
              style={styles.icon}
            />
          </View>
          <View style={styles.data}>
            <StyledText type="text" weight="medium">
              Add {toAdd}
            </StyledText>
          </View>
        </View>
        <StyledText type="text" weight="medium">
          $$$
        </StyledText>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: -1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    marginHorizontal: 20,
    borderColor: "#C2CED7",
    borderWidth: 2,
    borderRadius: 5,
    paddingRight: 5,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: 40,
    height: 40,
  },
  left: {
    flex: -1,
    flexDirection: "row",
  },
  data: {
    marginLeft: 5,
    justifyContent: "center",
  },
});

export default AddNewCard;
