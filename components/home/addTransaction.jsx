import React, { useState, useEffect, useContext } from "react";
import { Modal, View, StyleSheet, StatusBar, Keyboard } from "react-native";
import StyledText from "../shared/styledText";
import StyledTextInput from "../shared/styledTextInput";
import StyledDropdown from "../shared/styledDropdown";
import TextButton from "../shared/textButton";
import TypeRadioGroup from "./typeRadioGroup";
import { AccountContext } from "../../context/accountsContext";
import { TransactionContext } from "../../context/transactionContext";

const AddTransaction = (props) => {
  const { isEditing, toEditTransaction, isVisible, onClose } = props;
  const { selectedAccount, updateByTransactionAmount } =
    useContext(AccountContext);
  const { addNewTransaction, editExistingTransaction } =
    useContext(TransactionContext);
  const [attempted, setAttempted] = useState(false);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("misc");
  const [rawAmount, setRawAmount] = useState(0);
  const [formattedAmount, setFormattedAmount] = useState("");
  const [selectedType, setSelectedType] = useState("Expense");
  const [isFormValid, setIsFormValid] = useState(false);
  const [errors, setErrors] = useState({});
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  useEffect(() => {
    if (toEditTransaction) {
      setName(toEditTransaction.name);
      setCategory(toEditTransaction.category);
      setRawAmount(toEditTransaction.amount);
      setSelectedType(toEditTransaction.type);
      formatAmount();
    }
  }, [toEditTransaction, rawAmount]);

  const categoryEnum = [
    {
      label: "ATM",
      value: "ATM",
    },
    {
      label: "Bills",
      value: "bills",
    },
    {
      label: "Hobby",
      value: "hobby",
    },
    {
      label: "Dining Out",
      value: "dining out",
    },
    {
      label: "Education",
      value: "education",
    },
    {
      label: "Entertainment",
      value: "entertainment",
    },
    {
      label: "Fitness",
      value: "fitness",
    },
    {
      label: "Gifts",
      value: "gifts",
    },
    {
      label: "Groceries",
      value: "groceries",
    },
    {
      label: "Health",
      value: "health",
    },
    {
      label: "Paycheck",
      value: "paycheck",
    },
    {
      label: "Shopping",
      value: "shopping",
    },
    {
      label: "Subscriptions",
      value: "subscriptions",
    },
    {
      label: "Takeout",
      value: "takeout",
    },
    {
      label: "Transport",
      value: "transport",
    },
    {
      label: "Travel",
      value: "travel",
    },
    {
      label: "Little Treat",
      value: "little treat",
    },
    {
      label: "Utilities",
      value: "utilities",
    },
    {
      label: "Misc",
      value: "misc",
    },
  ];

  const handleSelectCategory = (value) => {
    setCategory(value);
  };

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
      errors.name = "Transaction description required.";
    }

    if (!rawAmount || rawAmount == 0) {
      errors.amount = "Amount cannot be zero.";
    }

    setErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
  };

  const handleSubmit = async () => {
    setAttempted(true);

    if (isFormValid) {
      try {
        let transaction;
        if (!isEditing) {
          transaction = {
            description: name,
            category: category,
            amount: rawAmount,
            type: selectedType,
            date: new Date().toISOString(),
            account_id: selectedAccount.id,
          };

          await addNewTransaction(transaction);

          await updateByTransactionAmount(
            selectedAccount.id,
            rawAmount,
            selectedType,
          );

          setName("");
          setSelectedType("Expense");
          setCategory("misc");
          setRawAmount(0);
          setFormattedAmount("");
          setAttempted(false);
          onClose();
        } else {
          console.log("Form is set to editing");
        }
      } catch (error) {
        console.log("Failed to submit form.", error);
      }
    } else {
      console.log("Form has errors. Please correct them.");
    }
  };

  useEffect(() => {
    validateForm();
  }, [name, rawAmount, attempted]);

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
          <StyledText type="header">
            {isEditing ? "Edit" : "New"} Transaction
          </StyledText>
        </View>
        {!isEditing && (
          <StyledText type="title">
            Add details of your new transaction.
          </StyledText>
        )}
        <View style={styles.inputContainer}>
          <View style={styles.inputGroup}>
            <StyledText type="text">Description</StyledText>
            <StyledTextInput
              icon="description"
              placeholder="Levi's jacket"
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
            <StyledText type="text">Category</StyledText>
            <StyledDropdown
              data={categoryEnum}
              icon="category"
              onSelect={handleSelectCategory}
              item={category}
            />
          </View>
          <View style={styles.inputGroup}>
            <StyledText type="text">Amount</StyledText>
            <StyledTextInput
              icon="amount"
              password={false}
              placeholder="$0.00"
              text={formattedAmount}
              setText={handleAmountChange}
              keyboardType="numeric"
              inputMode="numeric"
              onEndEditing={formatAmount}
              disabled={!isEditing}
            />
            {attempted && errors.amount && (
              <StyledText type="text" color="#FE616F">
                {errors.amount}
              </StyledText>
            )}
          </View>
          <View style={styles.inputGroup}>
            <TypeRadioGroup size={30} onValueChange={setSelectedType} />
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
                {isEditing ? "UPDATE" : "ADD"}
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

export default AddTransaction;
