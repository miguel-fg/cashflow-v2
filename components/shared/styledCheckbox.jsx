import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";

const StyledCheckbox = (props) => {
  const { size, isChecked, onToggle } = props;
  const [checked, setChecked] = useState(isChecked);

  const handlePress = () => {
    const newChecked = !checked;
    setChecked(newChecked);
    onToggle(newChecked);
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={[
        styles.container,
        { width: size, height: size, borderRadius: size / 5 },
      ]}
    >
      {checked && (
        <View
          style={[
            styles.innerSquare,
            { width: size * 0.6, height: size * 0.6, borderRadius: size * 0.1 },
          ]}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
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

export default StyledCheckbox;
