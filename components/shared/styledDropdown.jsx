import React, { useState, useRef } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import StyledText from "./styledText";

const getIconSource = (icon) => {
  switch (icon) {
    case "user":
      return require("../../assets/images/icons/user.png");
    case "lock":
      return require("../../assets/images/icons/password.png");
    case "email":
      return require("../../assets/images/icons/email.png");
    case "type":
      return require("../../assets/images/icons/account_type.png");
    case "amount":
      return require("../../assets/images/icons/amount.png");
    case "currency":
      return require("../../assets/images/icons/currency.png");
    case "description":
      return require("../../assets/images/icons/description.png");
    case "category":
      return require("../../assets/images/icons/category.png");
  }
};

const StyledDropdown = (props) => {
  const { data, icon, style, onSelect } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState("Mastercard");
  const [dropdownTop, setDropdownTop] = useState(0);
  const dropdownRef = useRef(null);
  const iconSource = getIconSource(icon);

  const handleSelect = (item) => {
    setSelectedItem(item.label);
    setIsOpen(false);
    onSelect(item.value);
  };

  const showDropdown = () => {
    dropdownRef.current.measureInWindow((x, y, width, height) => {
      setDropdownTop(height + 25);
      setIsOpen(!isOpen);
    });
  };

  return (
    <>
      <TouchableOpacity
        ref={dropdownRef}
        onPress={showDropdown}
        style={[styles.container, style]}
      >
        <View style={styles.left}>
          <Image source={iconSource} style={styles.icon} />
          <StyledText type="text">{selectedItem}</StyledText>
        </View>
        {isOpen ? (
          <Ionicons
            name="chevron-up"
            size={16}
            color="#080E21"
            style={{ marginLeft: 10 }}
          />
        ) : (
          <Ionicons
            name="chevron-down"
            size={16}
            color="#080E21"
            style={{ marginLeft: 10 }}
          />
        )}
      </TouchableOpacity>
      {isOpen && (
        <View style={[styles.dropdownList, { top: dropdownTop }]}>
          <FlatList
            data={data}
            keyExtractor={(item) => item.value}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.dropdownItem}
                onPress={() => handleSelect(item)}
              >
                <StyledText type="text">{item.label}</StyledText>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: -1,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#D3DDE6",
    borderRadius: 10,
    borderColor: "#416788",
    borderWidth: 1,
    alignItems: "center",
    shadowOffset: { width: -2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 2,
    zIndex: 2,
    paddingVertical: 9,
    paddingRight: 5,
  },
  left: {
    flexDirection: "row",
  },
  icon: {
    width: 20,
    height: 20,
    marginHorizontal: 5,
  },
  dropdownList: {
    zIndex: 2,
    position: "absolute",
    width: "100%",
    backgroundColor: "#D3DDE6",
    elevation: 5,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  dropdownItem: {
    paddingVertical: 9,
    paddingHorizontal: 20,
  },
});

export default StyledDropdown;
