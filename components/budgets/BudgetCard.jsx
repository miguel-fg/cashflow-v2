import React, { useState, useContext } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  Modal,
} from "react-native";
import StyledText from "../shared/styledText";
import TextButton from "../shared/textButton";
import { BudgetContext } from "../../context/budgetContext";
import AddBudget from "./addBudget.jsx";

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

const formatAmount = (amount) => {
  const formattedAmount = Math.abs(amount)
    .toFixed(2)
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return `$${formattedAmount}`;
};

const capitalizeWords = (s) => {
  return s.replace(/\b\w/g, (char) => char.toUpperCase());
};

const BudgetCard = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [editingVisible, setEditingVisible] = useState(false);
  const { removeBudget } = useContext(BudgetContext);
  const iconSource = getIconSource(props.category);
  const formattedCurrent = formatAmount(props.currentAmount);
  const formattedLimit = formatAmount(props.limitAmount);
  const formattedCategory = capitalizeWords(props.category);
  const percentage = Math.round(
    (props.currentAmount / props.limitAmount) * 100,
  );
  const currentBudget = {
    id: props.budgetId,
    category: props.category,
    current_amount: props.currentAmount,
    limit_amount: props.limitAmount,
  };

  const handlePressAndHold = () => {
    setModalVisible(true);
  };

  const handleEdit = () => {
    setModalVisible(false);
    setEditingVisible(true);
  };

  const closeEdit = () => {
    setEditingVisible(false);
  };

  const getBarColor = (percentage) => {
    if (percentage <= 50) return "#62A87C";
    if (percentage <= 80) return "#FEB101";
    return "#FE616F";
  };

  const barColor = getBarColor(percentage);

  const handleDelete = () => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this budget?",
      [
        {
          text: "Cancel",
          onPress: () => setModalVisible(false),
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: async () => {
            setModalVisible(false);
            await removeBudget(currentBudget.id);
          },
          style: "destructive",
        },
      ],
      { cancelable: false },
    );
  };

  return (
    <TouchableOpacity onLongPress={handlePressAndHold} activeOpacity={0.5}>
      <AddBudget
        isEditing={true}
        toEditBudget={currentBudget}
        isVisible={editingVisible}
        onClose={closeEdit}
      />
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <Image source={iconSource} style={styles.icon} />
        </View>
        <View style={styles.innerContainer}>
          <View style={styles.dataContainer}>
            <View style={styles.dataLeft}>
              <StyledText type="text" weight="medium">
                {formattedCategory}
              </StyledText>
              <StyledText type="label">{formattedCurrent}</StyledText>
            </View>
            <View style={styles.dataRight}>
              <StyledText type="text" weight="medium">
                {percentage}%
              </StyledText>
              <StyledText type="label">{formattedLimit}</StyledText>
            </View>
          </View>
          <View style={styles.barBackground}>
            <View
              style={[
                styles.barFill,
                { width: `${percentage}%`, backgroundColor: barColor },
              ]}
            />
          </View>
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.budgetInfo}>
              <StyledText type="title" weight="medium">
                {capitalizeWords(props.category)}
              </StyledText>
              <View style={styles.spacer}></View>
              <StyledText type="text">Limit: {formattedLimit}</StyledText>
              <StyledText type="text">Current: {formattedCurrent}</StyledText>
            </View>
            <View style={styles.mainButtons}>
              <TextButton
                variant="success"
                onPress={handleEdit}
                style={styles.buttonSize}
              >
                EDIT
              </TextButton>
              <TextButton
                variant="danger"
                onPress={handleDelete}
                style={styles.buttonSize}
              >
                DELETE
              </TextButton>
            </View>
            <TextButton
              variant="primary"
              onPress={() => setModalVisible(!modalVisible)}
              style={styles.cancelButton}
            >
              CANCEL
            </TextButton>
          </View>
        </View>
      </Modal>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: -1,
    flexDirection: "row",
    marginBottom: 10,
    marginHorizontal: 20,
    paddingRight: 5,
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
  dataContainer: {
    width: "100%",
    flex: -1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  innerContainer: {
    flex: -1,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  dataLeft: {
    marginLeft: 5,
  },
  dataRight: {
    alignItems: "flex-end",
  },
  barBackground: {
    height: 10,
    width: "100%",
    backgroundColor: "#C2CED7",
    marginLeft: 5,
    borderRadius: 5,
  },
  barFill: {
    height: "100%",
    borderRadius: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "#C2CED7",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonSize: {
    width: 100,
  },
  cancelButton: {
    marginTop: 50,
    width: 205,
  },
  mainButtons: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 5,
  },
  budgetInfo: {
    marginBottom: 20,
    width: 205,
  },
  spacer: {
    width: "100%",
    height: 10,
  },
});

export default BudgetCard;
