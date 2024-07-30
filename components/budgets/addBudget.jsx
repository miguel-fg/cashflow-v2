import React, { useState, useEffect, useContext } from "react";
import { Modal, View, StyleSheet, StatusBar, Keyboard } from "react-native";
import StyledText from "../shared/styledText";
import StyledTextInput from "../shared/styledTextInput";
import StyledDropdown from "../shared/styledDropdown";
import TextButton from "../shared/textButton";
import { BudgetContext } from "../../context/budgetContext";

const AddBudget = (props) => {
  const { isEditing, toEditBudget, isVisible, onClose } = props;
  const { addNewBudget, editExistingBudget } = useContext(BudgetContext);
  const [attempted, setAttempted] = useState(false);
  const [category, setCategory] = useState("misc");
  const [rawCurrent, setRawCurrent] = useState(0);
  const [rawLimit, setRawLimit] = useState(0);
  const [formattedCurrent, setFormattedCurrent] = useState("");
  const [formattedLimit, setFormattedLimit] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [errors, setErrors] = useState({});
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  useEffect(() => {
    if (toEditBudget) {
      setCategory(toEditBudget.category);
      setRawCurrent(toEditBudget.current_amount);
      setRawLimit(toEditBudget.limit_amount);
      formatCurrent();
      formatLimit();
    }
  }, [toEditBudget]);

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

  const handleCurrentChange = (input) => {
    let cleanedInput = input.replace(/[^0-9.]/g, "");

    const parts = cleanedInput.split(".");
    if (parts[1]) {
      cleanedInput = `${parts[0]}.${parts[1].slice(0, 2)}`;
    }

    const numericValue = parseFloat(cleanedInput);
    setRawCurrent(isNaN(numericValue) ? 0 : numericValue);
    setFormattedCurrent(input);
  };

  const handleLimitChange = (input) => {
    let cleanedInput = input.replace(/[^0-9.]/g, "");

    const parts = cleanedInput.split(".");
    if (parts[1]) {
      cleanedInput = `${parts[0]}.${parts[1].slice(0, 2)}`;
    }

    const numericValue = parseFloat(cleanedInput);
    setRawLimit(isNaN(numericValue) ? 0 : numericValue);
    setFormattedLimit(input);
  };

  const formatCurrent = () => {
    if (rawCurrent) {
      const formattedValue = `$${rawCurrent.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
      setFormattedCurrent(formattedValue);
    }
  };

  const formatLimit = () => {
    if (rawLimit) {
      const formattedValue = `$${rawLimit.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
      setFormattedLimit(formattedValue);
    }
  };

  const validateForm = () => {
    let errors = {};

    if (!rawLimit || rawLimit == 0) {
      errors.limit = "Limit cannot be zero.";
    }

    if (rawCurrent && rawLimit) {
      if (rawCurrent > rawLimit) {
        errors.current = "Current value cannot be higher than the limit.";
      }
    }

    setErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
  };

  const handleSubmit = async () => {
    setAttempted(true);

    if (isFormValid) {
      try {
        let budget;
        if (!isEditing) {
          budget = {
            category: category,
            current_amount: rawCurrent,
            limit_amount: rawLimit,
          };

          await addNewBudget(budget);
        } else {
          budget = {
            id: toEditBudget.id,
            category: category,
            current_amount: rawCurrent,
            limit_amount: rawLimit,
          };

          await editExistingBudget(budget);
        }

        setCategory("misc");
        setRawCurrent(0);
        setRawLimit(0);
        setFormattedCurrent("");
        setFormattedLimit("");
        setAttempted(false);
        onClose();
      } catch (error) {
        console.log("Failed to submit form.", error);
      }
    } else {
      console.log("Form has errors. Please correct them.");
    }
  };

  useEffect(() => {
    validateForm();
  }, [rawCurrent, rawLimit, attempted]);

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
            {isEditing ? "Edit" : "New"} Budget
          </StyledText>
        </View>
        {!isEditing && (
          <StyledText type="title">Add details of your new budget.</StyledText>
        )}
        <View style={styles.inputContainer}>
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
            <StyledText type="text">Limit Amount</StyledText>
            <StyledTextInput
              icon="amount"
              password={false}
              placeholder="$100.00"
              text={formattedLimit}
              setText={handleLimitChange}
              keyboardType="numeric"
              inputMode="numeric"
              onEndEditing={formatLimit}
            />
            {attempted && errors.limit && (
              <StyledText type="text" color="#FE616F">
                {errors.limit}
              </StyledText>
            )}
          </View>
          <View style={styles.inputGroup}>
            <StyledText type="text">Current Amount</StyledText>
            <StyledTextInput
              icon="amount"
              password={false}
              placeholder="$0.00"
              text={formattedCurrent}
              setText={handleCurrentChange}
              keyboardType="numeric"
              inputMode="numeric"
              onEndEditing={formatCurrent}
              disabled={!isEditing}
            />
            {isEditing && (
              <StyledText type="text">
                Current amount cannot be edited.
              </StyledText>
            )}
            {attempted && errors.current && (
              <StyledText type="text" color="#FE616F">
                {errors.current}
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

export default AddBudget;
