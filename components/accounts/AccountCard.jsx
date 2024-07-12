import React from "react";
import { View, StyleSheet, Image } from "react-native";
import StyledText from "../shared/styledText";

const getIconSource = (type) => {
  switch (type) {
    case "mastercard":
      return require("../../assets/images/icons/mastercard.png");
    case "visa":
      return require("../../assets/images/icons/visa.png");
    default:
      return require("../../assets/images/icons/other_banking.png");
  }
};

const formatAmount = (amount) => {
  const formattedAmount = Math.abs(amount)
    .toFixed(2)
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return `$${formattedAmount}`;
};

const AccountCard = (props) => {
  const iconSource = getIconSource(props.type);
  const formattedAmount = formatAmount(props.amount);

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <View style={styles.iconContainer}>
          <Image source={iconSource} style={styles.icon} />
        </View>
        <View style={styles.data}>
          <StyledText type="text" weight="medium">
            {props.name}
          </StyledText>
          <StyledText type="label">{props.currency}</StyledText>
        </View>
      </View>
      <StyledText type="text" weight="medium">
        {formattedAmount}
      </StyledText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: -1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  iconContainer: {
    width: 50,
    height: 50,
    backgroundColor: "#C2CED7",
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
  },
});

export default AccountCard;
