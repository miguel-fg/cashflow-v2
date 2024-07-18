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
  const [loading, setLoading] = useState(false);

  const fetchAccounts = async () => {
    setLoading(true);
    try {
      const user = await AsyncStorage.getItem("user");
      const { name } = JSON.parse(user);
      const userId = await getUserIdByUsername(name);
      const fetchedAccounts = await getAccounts(userId);
      setAccounts(fetchedAccounts);
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
      await fetchAccounts();
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
      await fetchAccounts();
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
