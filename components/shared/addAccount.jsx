import React, { useState, useEffect } from "react";
import { Modal, View, StyleSheet, StatusBar, Keyboard } from "react-native";
import StyledText from "./styledText.jsx";
import StyledTextInput from "./styledTextInput.jsx";
import StyledDropdown from "./styledDropdown.jsx";
import StyledCheckbox from "./styledCheckbox.jsx";
import TextButton from "./textButton.jsx";
import { iso4217CurrencyCodes } from "../../constants/currencyCodes.js";
import { initDB } from "../../db/database.js";

const AddAccount = (props) => {
  const { userId, isEditing, toEditAccount, isVisible, onClose } = props;
  const [attempted, setAttempted] = useState(false);
  const [name, setName] = useState("");
  const [type, setType] = useState("mastercard");
  const [credit, setCredit] = useState(false);
  const [formattedAmount, setFormattedAmount] = useState("");
  const [rawAmount, setRawAmount] = useState(0);
  const [currency, setCurrency] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [errors, setErrors] = useState({});
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  useEffect(() => {
    if (toEditAccount) {
      setName(toEditAccount.name);
      setType(toEditAccount.type);
      setRawAmount(toEditAccount.amount);
      setCurrency(toEditAccount.currency);
      setCredit(toEditAccount.credit === 1);
      formatAmount();
    }
  }, [toEditAccount, rawAmount]);

  const typeEnum = [
    {
      label: "Mastercard",
      value: "mastercard",
    },
    {
      label: "Visa",
      value: "visa",
    },
    {
      label: "Other",
      value: "other",
    },
  ];

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

  const handleSelectType = (value) => {
    setType(value);
  };

  const handleCheckboxToggle = (isChecked) => {
    setCredit(isChecked);
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

    if (!currency) {
      errors.currency = "Currency required.";
    } else if (!iso4217CurrencyCodes.includes(currency.toUpperCase())) {
      errors.currency = "Invalid currency code.";
    }

    setErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
  };

  const handleSubmit = async () => {
    setAttempted(true);

    if (isFormValid) {
      try {
        const db = await initDB();
        const creditValue = credit ? 1 : 0;
        const currencyValue = currency.toUpperCase();
        const typeValue = type.toLowerCase().trim();

        if (!isEditing) {
          await db.runAsync(
            "INSERT INTO accounts (user_id, name, currency, type, amount, credit) VALUES (?, ?, ?, ?, ?, ?)",
            [userId, name, currencyValue, typeValue, rawAmount, creditValue],
          );
        } else {
          const accountId = toEditAccount.id;
          await db.runAsync(
            "UPDATE accounts SET name = ?, currency = ?, type = ?, credit = ? WHERE user_id = ? AND id = ?",
            [name, currencyValue, typeValue, creditValue, userId, accountId],
          );
        }
        setName("");
        setType("mastercard");
        setCredit(false);
        setFormattedAmount("$0.00");
        setRawAmount(0);
        setCurrency("");
        setAttempted(false);
        onClose();
      } catch (error) {
        console.error("Failed to submit form.", error);
      }
    } else {
      console.error("Form has errors. Please correct them.");
    }
  };

  useEffect(() => {
    validateForm();
  }, [name, type, currency, attempted]);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setIsKeyboardVisible(true);
      },
    );

    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setIsKeyboardVisible(false);
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

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
          <View style={styles.typeContainer}>
            <View style={styles.inputGroup}>
              <StyledText type="text" style={styles.inputLabel}>
                Account Type
              </StyledText>
              <StyledDropdown
                data={typeEnum}
                icon="type"
                onSelect={handleSelectType}
                item={type}
              />
            </View>
            <View style={styles.creditContainer}>
              <StyledText type="text" style={styles.inputLabel}>
                Credit
              </StyledText>
              <StyledCheckbox
                size={30}
                isChecked={credit}
                onToggle={handleCheckboxToggle}
              />
            </View>
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
        {!isKeyboardVisible && (
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
        )}
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
    flexGrow: 1,
    flexBasis: "auto",
  },
  creditContainer: {
    marginTop: 10,
    marginLeft: 10,
    alignItems: "flex-end",
  },
  typeContainer: {
    flex: -1,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
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
