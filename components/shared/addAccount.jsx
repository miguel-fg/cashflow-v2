import React, { useState, useEffect } from "react";
import { Modal, View, StyleSheet, StatusBar } from "react-native";
import StyledText from "./styledText.jsx";
import StyledTextInput from "./styledTextInput.jsx";
import TextButton from "./textButton.jsx";

const AddAccount = (props) => {
  const { isVisible, onClose } = props;
  const [attempted, setAttempted] = useState(false);
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [credit, setCredit] = useState(false);
  const [amount, setAmount] = useState(0);
  const [currency, setCurrency] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let errors = {};

    if (attempted) {
      if (!name) {
        errors.name = "Account name required.";
      }

      if (!type) {
        errors.type = "Account type required.";
      }

      if (!currency) {
        errors.currency = "Currency required.";
      }

      setErrors(errors);
      setIsFormValid(Object.keys(errors).length === 0);
    }
  };

  const handleSubmit = () => {
    setAttempted(true);

    if (isFormValid) {
      console.log("Form submitted!");
      onClose();
    } else {
      console.error("Form has errors. Please correct them.");
    }
  };

  useEffect(() => {
    validateForm();
  }, [name, type, amount, currency, attempted]);

  return (
    <Modal animationType="slide" transparent={false} visible={isVisible}>
      <StatusBar barStyle="dark-content" backgroundColor="#EEF0F2" />
      <View style={styles.modalContainer}>
        <View style={styles.titleContainer}>
          <StyledText type="header">New Account</StyledText>
        </View>
        <StyledText type="title">Add details of your new account.</StyledText>
        <View style={styles.inputContainer}>
          <StyledTextInput
            icon="description"
            placeholder="Name"
            password={false}
            text={name}
            setText={setName}
          />
          {errors.name && (
            <StyledText type="text" color="#FE616F">
              {errors.name}
            </StyledText>
          )}
          <StyledTextInput
            icon="type"
            placeholder="Account Type"
            password={false}
            text={type}
            setText={setType}
          />
          {errors.type && (
            <StyledText type="text" color="#FE616F">
              {errors.type}
            </StyledText>
          )}
          <StyledTextInput
            icon="amount"
            placeholder={credit ? "Current Limit" : "Current Amount"}
            password={false}
            text={amount}
            setText={setAmount}
          />
          <StyledTextInput
            icon="currency"
            placeholder="Currency"
            password={false}
            text={currency}
            setText={setCurrency}
          />
          {errors.currency && (
            <StyledText type="text" color="#FE616F">
              {errors.currency}
            </StyledText>
          )}
        </View>
        <View style={styles.buttonContainer}>
          <View style={styles.buttons}>
            <TextButton
              variant="primary"
              style={styles.buttonSize}
              onPress={handleSubmit}
            >
              ADD
            </TextButton>
            <TextButton
              variant="danger"
              style={styles.buttonSize}
              onPress={onClose}
            >
              CANCEL
            </TextButton>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    height: "100%",
    width: "100%",
    backgroundColor: "#EEF0F2",
    position: "absolute",
    alignItems: "center",
  },
  titleContainer: {
    alignItems: "center",
    width: "100%",
    marginTop: 50,
    marginBottom: 30,
  },
  inputContainer: {
    width: "80%",
    marginTop: 20,
  },
  buttonContainer: {
    alignItems: "center",
    width: "100%",
    flex: 1,
    flexDirection: "column-reverse",
  },
  buttons: {
    alignItems: "center",
    width: "100%",
    marginBottom: 80,
  },
  buttonSize: {
    width: "80%",
    marginVertical: 10,
  },
});

export default AddAccount;
