import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  Alert,
} from "react-native";
import StyledText from "../shared/styledText";
import TextButton from "../shared/textButton";
import { initDB } from "../../db/database";

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
  const [modalVisible, setModalVisible] = useState(false);
  const iconSource = getIconSource(props.type);
  const formattedAmount = formatAmount(props.amount);

  const handlePressAndHold = () => {
    setModalVisible(true);
  };

  const handleEdit = () => {
    setModalVisible(false);
  };

  const handleDelete = () => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this account?\n\nThis action will also delete all associated transactions.",
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
            try {
              const db = await initDB();
              await db.runAsync(
                "DELETE FROM transactions WHERE account_id = ?",
                [props.accountId],
              );
              await db.runAsync("DELETE FROM accounts WHERE id = ?", [
                props.accountId,
              ]);
              props.setFetchFlag((prev) => !prev);
            } catch (error) {
              console.error("Failed to delete account. ", error);
            }
          },
        },
      ],
      { cancelable: false },
    );
  };

  return (
    <TouchableOpacity onLongPress={handlePressAndHold} activeOpacity={0.5}>
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
            <View style={styles.accountInfo}>
              <StyledText type="title" weight="medium">
                {props.name}
              </StyledText>
              <StyledText type="text">{props.type.toUpperCase()}</StyledText>
              <StyledText type="text">
                {formattedAmount} {props.currency}
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
  accountInfo: {
    marginBottom: 20,
    width: 205,
  },
});

export default AccountCard;
