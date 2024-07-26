import React, { createContext, useState, useContext, useEffect } from "react";
import {
  getBudgets,
  getSingleBudget,
  addBudget,
  editBudget,
  deleteBudget,
} from "../db/budgetService";
import { AccountContext } from "./accountsContext";

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

        setBudgets((prevBudgets) => [...prevBudgets, newBudget]);
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
      setBudgets((prevBudgets) => {
        prevBudgets.map((b) => (b.id === budget.id ? { ...b, ...budget } : b));
      });
    } catch (error) {
      console.error("[Provider] Failed to edit budget. ERR: ", error);
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
        removeBudget,
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
};
