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
  const [formattedAmount, setFormattedAmount] = useState("");
  const [rawAmount, setRawAmount] = useState(0);
  const [currency, setCurrency] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [errors, setErrors] = useState({});

  const handleAmountChange = (input) => {
    let cleanedInput = input.replace(/[^0-9.]/g, "");

    const parts = cleanedInput.split(".");
    if (parts[1]) {
      cleanedInput = `${parts[0]}.${parts[1].slice(0, 2)}`;
    }

    const numericValue = parseFloat(cleanedInput);
    setRawAmount(isNaN(numericValue) ? 0 : numericValue);
    setFormattedAmount(input);
  };

  const formatAmount = () => {
    const formattedInput = `$${rawAmount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
    setFormattedAmount(formattedInput);
  };

  const validateForm = () => {
    let errors = {};

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
  };

  const handleSubmit = () => {
    setAttempted(true);

    if (isFormValid) {
      console.log("Form submitted!");
      setName("");
      setType("");
      setCredit(false);
      setFormattedAmount("$0.00");
      setRawAmount(0);
      setCurrency("");
      setAttempted(false);
      onClose();
    } else {
      console.error("Form has errors. Please correct them.");
    }
  };

  useEffect(() => {
    validateForm();
  }, [name, type, currency, attempted]);

  return (
    <Modal animationType="slide" transparent={false} visible={isVisible}>
      <StatusBar barStyle="dark-content" backgroundColor="#EEF0F2" />
      <View style={styles.modalContainer}>
        <View style={styles.titleContainer}>
          <StyledText type="header">New Account</StyledText>
        </View>
        <StyledText type="title">Add details of your new account.</StyledText>
        <View style={styles.inputContainer}>
          <View style={styles.inputGroup}>
            <StyledText type="text">Name</StyledText>
            <StyledTextInput
              icon="description"
              placeholder="TD Checking"
              password={false}
              text={name}
              setText={setName}
            />
            {attempted && errors.name && (
              <StyledText type="text" color="#FE616F">
                {errors.name}
              </StyledText>
            )}
          </View>
          <View style={styles.inputGroup}>
            <StyledText type="text" style={styles.inputLabel}>
              Account Type
            </StyledText>
            <StyledTextInput
              icon="type"
              placeholder="Mastercard"
              password={false}
              text={type}
              setText={setType}
            />
            {attempted && errors.type && (
              <StyledText type="text" color="#FE616F">
                {errors.type}
              </StyledText>
            )}
          </View>
          <View style={styles.inputGroup}>
            <StyledText type="text">
              {credit ? "Current Limit" : "Current Amount"}
            </StyledText>
            <StyledTextInput
              icon="amount"
              password={false}
              placeholder="$0.00"
              text={formattedAmount}
              setText={handleAmountChange}
              keyboardType="numeric"
              inputMode="numeric"
              onEndEditing={formatAmount}
            />
          </View>
          <View style={styles.inputGroup}>
            <StyledText type="text">Currency</StyledText>
            <StyledTextInput
              icon="currency"
              placeholder="CAD"
              password={false}
              text={currency}
              setText={setCurrency}
            />
            {attempted && errors.currency && (
              <StyledText type="text" color="#FE616F">
                {errors.currency}
              </StyledText>
            )}
          </View>
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
  inputGroup: {
    marginTop: 10,
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
    marginBottom: 40,
  },
  buttonSize: {
    width: "80%",
    marginVertical: 10,
  },
});

export default AddAccount;
