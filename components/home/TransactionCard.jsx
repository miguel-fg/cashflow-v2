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
import AddTransaction from "./addTransaction";
import TextButton from "../shared/textButton";
import { TransactionContext } from "../../context/transactionContext";
import { AccountContext } from "../../context/accountsContext";
import { BudgetContext } from "../../context/budgetContext";

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

const formatDate = (isoDate) => {
  const date = new Date(isoDate);

  const weekday = date.toLocaleDateString("en-US", { weekday: "long" });
  const monthDay = date.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
  });
  const year = date.getFullYear();
  const formatted = `${weekday}, ${monthDay} ${year}`;

  return formatted;
};

const TransactionCard = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [editingVisible, setEditingVisible] = useState(false);
  const { removeTransaction } = useContext(TransactionContext);
  const { selectedAccount, updateTotalsOnDelete } = useContext(AccountContext);
  const { revertBudgetOnTransactionDelete } = useContext(BudgetContext);
  const iconSource = getIconSource(props.category);
  const amountColor = props.type === "Income" ? "#62A87C" : "#FE616F";
  const formattedAmount = formatAmount(props.amount, props.type);
  const formattedCategory = capitalizeWords(props.category);
  const currentTransaction = {
    id: props.transactionId,
    description: props.name,
    category: props.category,
    type: props.type,
    amount: props.amount,
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

  const handleDelete = () => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this transaction?",
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
            // call delete transaction
            await removeTransaction(currentTransaction.id);
            await updateTotalsOnDelete(
              selectedAccount.id,
              currentTransaction.amount,
              currentTransaction.type,
            );
            await revertBudgetOnTransactionDelete(
              currentTransaction.category,
              currentTransaction.amount,
              currentTransaction.type,
            );
          },
          style: "destructive",
        },
      ],
      { cancelable: false },
    );
  };

  return (
    <TouchableOpacity onLongPress={handlePressAndHold} activeOpacity={0.5}>
      <AddTransaction
        isEditing={true}
        toEditTransaction={currentTransaction}
        isVisible={editingVisible}
        onClose={closeEdit}
      />
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
            <View style={styles.transactionInfo}>
              <StyledText type="title" weight="medium">
                {props.name}
              </StyledText>
              <StyledText type="label">{formatDate(props.date)}</StyledText>
              <View style={styles.spacer}></View>
              <StyledText type="text">{formattedAmount}</StyledText>
              <StyledText type="text">
                {capitalizeWords(props.category)}
              </StyledText>
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
    justifyContent: "space-between",
    alignItems: "center",
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
  left: {
    flex: -1,
    flexDirection: "row",
  },
  data: {
    marginLeft: 5,
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
  transactionInfo: {
    marginBottom: 20,
    width: 205,
  },
  spacer: {
    width: "100%",
    height: 10,
  },
});

export default TransactionCard;
