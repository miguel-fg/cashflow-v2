import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  getAccounts,
  getSingleAccount,
  addAccount,
  editAccount,
  updateAccountAmount,
  deleteAccount,
} from "../db/accountService";
import { getUserIdByUsername } from "../db/database";

export const AccountContext = createContext();

export const AccountProvider = ({ children }) => {
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchAccounts = async () => {
    setLoading(true);
    try {
      const user = await AsyncStorage.getItem("user");
      const { name } = JSON.parse(user);
      const userId = await getUserIdByUsername(name);
      const fetchedAccounts = await getAccounts(userId);
      setAccounts(fetchedAccounts);

      if (!selectedAccount && fetchedAccounts.length > 0) {
        setSelectedAccount(fetchedAccounts[0]);
      }
    } catch (error) {
      console.error("[Provider] Failed to fetch accounts. ERR: ", error);
    } finally {
      setLoading(false);
    }
  };

  const addNewAccount = async (account) => {
    setLoading(true);
    try {
      const user = await AsyncStorage.getItem("user");
      const { name } = JSON.parse(user);
      const userId = await getUserIdByUsername(name);

      const { id } = await addAccount(account, userId);

      const newAccount = await getSingleAccount(id);
      setAccounts((prevAccounts) => [...prevAccounts, newAccount]);
    } catch (error) {
      console.error("[Provider] Failed to add account. ERR: ", error);
    } finally {
      setLoading(false);
    }
  };

  const editExistingAccount = async (account) => {
    setLoading(true);
    try {
      await editAccount(account);
      setAccounts((prevAccounts) => {
        prevAccounts.map((acc) =>
          acc.id === account.id ? { ...acc, ...account } : acc,
        );
      });
    } catch (error) {
      console.error("[Provider] Failed to edit account. ERR: ", error);
    } finally {
      setLoading(false);
    }
  };

  const updateByTransactionAmount = async (
    accountId,
    transactionAmount,
    type,
  ) => {
    setLoading(true);
    try {
      await updateAccountAmount(accountId, transactionAmount, type);

      setAccounts((prevAccounts) =>
        prevAccounts.map((acc) => {
          if (acc.id === accountId) {
            return {
              ...acc,
              amount:
                type === "Income"
                  ? acc.amount + transactionAmount
                  : acc.amount - transactionAmount,
              total_income:
                type === "Income"
                  ? acc.total_income + transactionAmount
                  : acc.total_income,
              total_expense:
                type === "Income"
                  ? acc.total_expense
                  : acc.total_expense + transactionAmount,
            };
          }
          return acc;
        }),
      );

      setSelectedAccount((prev) => ({
        ...prev,
        amount:
          type === "Income"
            ? prev.amount + transactionAmount
            : prev.amount - transactionAmount,
        total_income:
          type === "Income"
            ? prev.total_income + transactionAmount
            : prev.total_income,
        total_expense:
          type === "Income"
            ? prev.total_expense
            : prev.total_expense + transactionAmount,
      }));
    } catch (error) {
      console.error("[Provider] Failed to update account amount. ERR: ", error);
    } finally {
      setLoading(false);
    }
  };

  const removeAccount = async (accountId) => {
    setLoading(true);
    try {
      await deleteAccount(accountId);
      setAccounts((prevAccounts) =>
        prevAccounts.filter((account) => account.id !== accountId),
      );
    } catch (error) {
      console.error("[Provider] Failed to delete account. ERR: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  return (
    <AccountContext.Provider
      value={{
        accounts,
        selectedAccount,
        setSelectedAccount,
        loading,
        fetchAccounts,
        addNewAccount,
        editExistingAccount,
        updateByTransactionAmount,
        removeAccount,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};
