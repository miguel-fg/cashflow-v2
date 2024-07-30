import React, { createContext, useState, useContext, useEffect } from "react";
import {
  getBudgets,
  getSingleBudget,
  addBudget,
  editBudget,
  deleteBudget,
  getBudgetsByCategory,
  updateBudgetCurrentAmount,
} from "../db/budgetService";
import { AccountContext } from "./accountsContext";
import { Alert } from "react-native";

export const BudgetContext = createContext();

export const BudgetProvider = ({ children }) => {
  const { selectedAccount } = useContext(AccountContext);
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchBudgets = async () => {
    if (selectedAccount) {
      setLoading(true);
      try {
        const fetchedBudgets = await getBudgets(selectedAccount.id);
        setBudgets(fetchedBudgets);
      } catch (error) {
        console.error("[Provider] Failed to fetch budgets. ERR: ", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const addNewBudget = async (budget) => {
    if (selectedAccount) {
      setLoading(true);
      try {
        const { id } = await addBudget(budget, selectedAccount.id);
        const newBudget = await getSingleBudget(id);

        setBudgets((prevBudgets) => [newBudget, ...prevBudgets]);
      } catch (error) {
        console.error("[Provider] Failed to add budget. ERR: ", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const editExistingBudget = async (budget) => {
    setLoading(true);
    try {
      await editBudget(budget);
      fetchBudgets();
    } catch (error) {
      console.error("[Provider] Failed to edit budget. ERR: ", error);
    } finally {
      setLoading(false);
    }
  };

  const updateBudgetOnTransaction = async (
    category,
    amount,
    type,
    isEdit = false,
    previousAmount = 0,
    previousType = "Expense",
  ) => {
    setLoading(true);
    try {
      const budgets = await getBudgetsByCategory(category);

      for (const budget of budgets) {
        let newAmount = budget.current_amount;

        if (isEdit) {
          if (previousType === "Income") {
            newAmount += previousAmount;
          } else {
            newAmount -= previousAmount;
          }
        }

        if (type === "Income") {
          newAmount -= amount;
        } else {
          newAmount += amount;
        }

        if (newAmount >= budget.limit_amount) {
          Alert.alert(
            "Budget Alert",
            `You have reached your budget limit for ${category}`,
          );
        }

        await updateBudgetCurrentAmount(budget.id, newAmount);
      }

      fetchBudgets();
    } catch (error) {
      console.error(
        "[Provider] Failed to update budgets on transaction. ERR: ",
        error,
      );
    } finally {
      setLoading(false);
    }
  };

  const revertBudgetOnTransactionDelete = async (category, amount, type) => {
    setLoading(true);
    try {
      const budgets = await getBudgetsByCategory(category);

      for (const budget of budgets) {
        let newAmount = budget.current_amount;

        if (type === "Income") {
          newAmount += amount;
        } else {
          newAmount -= amount;
        }

        await updateBudgetCurrentAmount(budget.id, newAmount);
      }

      fetchBudgets();
    } catch (error) {
      console.error(
        "[Provider] Failed to revert budget on transaction delete. ERR: ",
        error,
      );
    } finally {
      setLoading(false);
    }
  };

  const removeBudget = async (budgetId) => {
    setLoading(true);
    try {
      await deleteBudget(budgetId);
      setBudgets((prevBudgets) =>
        prevBudgets.filter((budget) => budget.id !== budgetId),
      );
    } catch (error) {
      console.error("[Provider] Failed to delete budget. ERR: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBudgets();
  }, [selectedAccount]);

  return (
    <BudgetContext.Provider
      value={{
        budgets,
        loading,
        fetchBudgets,
        addNewBudget,
        editExistingBudget,
        updateBudgetOnTransaction,
        revertBudgetOnTransactionDelete,
        removeBudget,
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
};
