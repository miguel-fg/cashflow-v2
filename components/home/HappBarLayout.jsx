import React, { useState, useEffect, useRef, useContext } from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import StyledText from "../shared/styledText";
import { AccountContext } from "../../context/accountsContext";

const HappBarLayout = () => {
  const {
    accounts,
    loading,
    selectedAccount,
    setSelectedAccount,
    fetchAccounts,
  } = useContext(AccountContext);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState(
    selectedAccount ? selectedAccount.name : "",
  );
  const [dropdownTop, setDropdownTop] = useState(0);
  const dropdownRef = useRef(null);

  const handleSelect = (item) => {
    setSelectedAccount(item);
    setSelectedLabel(item.name);
    setIsOpen(false);
  };

  const showDropdown = () => {
    dropdownRef.current.measure((fx, fy, width, height, px, py) => {
      setDropdownTop(py + 5);
      setIsOpen(!isOpen);
    });
  };

  const formatAmount = (amount) => {
    const formattedAmount = Math.abs(amount)
      .toFixed(2)
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return `$${formattedAmount}`;
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  if (loading) {
    return <></>;
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        ref={dropdownRef}
        style={styles.dropDown}
        onPress={showDropdown}
      >
        <Image
          source={require("../../assets/images/icons/wallet.png")}
          style={{ width: 20, height: 20, marginRight: 5 }}
        />
        <StyledText type="text">{selectedLabel}</StyledText>
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
            data={accounts}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.dropdownItem}
                onPress={() => handleSelect(item)}
              >
                <StyledText type="text">{item.name}</StyledText>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
      <StyledText type="header" variant="light">
        {selectedAccount && formatAmount(selectedAccount.amount)}
      </StyledText>
      <View style={styles.accountData}>
        <View style={styles.dataContainer}>
          <Ionicons name="chevron-up-circle" size={25} color="#62A87C" />
          <View style={styles.income}>
            <StyledText type="label" variant="light">
              Income
            </StyledText>
            <StyledText type="text" variant="light" weight="medium">
              {selectedAccount && formatAmount(selectedAccount.total_income)}
            </StyledText>
          </View>
        </View>
        <View style={styles.dataContainer}>
          <View style={styles.expenses}>
            <StyledText type="label" variant="light">
              Expenses
            </StyledText>
            <StyledText type="text" variant="light" weight="medium">
              {selectedAccount && formatAmount(selectedAccount.total_expense)}
            </StyledText>
          </View>
          <Ionicons name="chevron-down-circle" size={25} color="#FE616F" />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  dropDown: {
    flex: -1,
    flexDirection: "row",
    height: 30,
    justifyContent: "space-between",
    backgroundColor: "#EEF0F2",
    alignItems: "center",
    borderRadius: 5,
    paddingHorizontal: 5,
    marginTop: 10,
    zIndex: 2,
  },
  dropdownList: {
    backgroundColor: "#EEF0F2",
    borderRadius: 5,
    paddingHorizontal: 5,
    position: "absolute",
    zIndex: 1,
    // shadow for iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    // elevation for Android
    elevation: 5,
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  accountData: {
    flex: -1,
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginTop: 25,
  },
  dataContainer: {
    flex: -1,
    flexDirection: "row",
    alignItems: "center",
  },
  income: {
    marginLeft: 5,
  },
  expenses: {
    flex: -1,
    alignItems: "flex-end",
    marginRight: 5,
  },
});

export default HappBarLayout;
