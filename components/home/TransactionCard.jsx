import React from "react";
import { View, StyleSheet, Image } from "react-native";

import StyledText from "../shared/styledText";

const getIconSource = (category) => {
  switch (category) {
    case "ATM":
      return require("../../assets/images/icons/atm.png");
    case "bills":
      return require("../../assets/images/icons/bills.png");
    case "hobby":
      return require("../../assets/images/icons/crafts.png");
    case "dining out":
      return require("../../assets/images/icons/dining_out.png");
    case "education":
      return require("../../assets/images/icons/education.png");
    case "entertainment":
      return require("../../assets/images/icons/entertainment.png");
    case "fitness":
      return require("../../assets/images/icons/fitness.png");
    case "gifts":
      return require("../../assets/images/icons/gift.png");
    case "groceries":
      return require("../../assets/images/icons/groceries.png");
    case "health":
      return require("../../assets/images/icons/health.png");
    case "paycheck":
      return require("../../assets/images/icons/paycheque.png");
    case "shopping":
      return require("../../assets/images/icons/shopping.png");
    case "subscriptions":
      return require("../../assets/images/icons/subscriptions.png");
    case "takeout":
      return require("../../assets/images/icons/takeout.png");
    case "transport":
      return require("../../assets/images/icons/transport.png");
    case "travel":
      return require("../../assets/images/icons/travel.png");
    case "little treat":
      return require("../../assets/images/icons/treat.png");
    case "utilities":
      return require("../../assets/images/icons/utilities.png");
    default:
      return require("../../assets/images/icons/misc.png");
  }
};

const formatAmount = (amount, type) => {
  const formattedAmount = Math.abs(amount)
    .toFixed(2)
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const sign = type === "Expense" ? "-" : "";

  return `${sign}$${formattedAmount}`;
};

const capitalizeWords = (s) => {
  return s.replace(/\b\w/g, (char) => char.toUpperCase());
};

const TransactionCard = (props) => {
  const iconSource = getIconSource(props.category);
  const amountColor = props.type === "Income" ? "#62A87C" : "#FE616F";
  const formattedAmount = formatAmount(props.amount, props.type);
  const formattedCategory = capitalizeWords(props.category);

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <View style={styles.iconContainer}>
          <Image source={iconSource} style={styles.icon} />
        </View>
        <View style={styles.data}>
          <StyledText type="text" weight="medium">
            {formattedCategory}
          </StyledText>
          <StyledText type="label">{props.name}</StyledText>
        </View>
      </View>
      <StyledText type="text" weight="medium" color={amountColor}>
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

export default TransactionCard;
