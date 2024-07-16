import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import StyledText from "../shared/styledText";
import Ionicons from "@expo/vector-icons/Ionicons";

const TypeRadioGroup = (props) => {
  const { size, onValueChange } = props;
  const [selectedValue, setSelectedValue] = useState("Expense");

  const handleToggle = (value) => {
    setSelectedValue(value);
    onValueChange(value);
  };

  return (
    <View style={styles.container}>
      <View style={styles.groupContainer}>
        <View style={styles.itemLabel}>
          <Ionicons name="chevron-up-circle" size={25} color="#62A87C" />
          <StyledText type="text">Income</StyledText>
        </View>
        <TouchableOpacity
          onPress={() => handleToggle("Income")}
          style={[
            styles.outerSquare,
            { width: size, height: size, borderRadius: size / 5 },
          ]}
        >
          {selectedValue === "Income" && (
            <View
              style={[
                styles.innerSquare,
                {
                  width: size * 0.6,
                  height: size * 0.6,
                  borderRadius: size * 0.1,
                },
              ]}
            ></View>
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.groupContainer}>
        <View style={styles.itemLabel}>
          <StyledText type="text">Expense</StyledText>
          <Ionicons name="chevron-down-circle" size={25} color="#FE616F" />
        </View>
        <TouchableOpacity
          onPress={() => handleToggle("Expense")}
          style={[
            styles.outerSquare,
            { width: size, height: size, borderRadius: size / 5 },
          ]}
        >
          {selectedValue === "Expense" && (
            <View
              style={[
                styles.innerSquare,
                {
                  width: size * 0.6,
                  height: size * 0.6,
                  borderRadius: size * 0.1,
                },
              ]}
            ></View>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  groupContainer: {
    alignItems: "center",
  },
  itemLabel: {
    flexDirection: "row",
    alignItems: "center",
  },
  outerSquare: {
    borderWidth: 1,
    backgroundColor: "#D3DDE6",
    borderColor: "#416788",
    justifyContent: "center",
    alignItems: "center",
  },
  innerSquare: {
    backgroundColor: "#080E21",
  },
});

export default TypeRadioGroup;
