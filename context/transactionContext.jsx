import React, { createContext, useState } from "react";
import {
  getTransactions,
  getSingleTransaction,
  addTransaction,
  editTransaction,
  deleteTransaction,
} from "../db/transactionService";

export const TransactionContext = createContext();

export const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTransactions = async (accountId) => {
    setLoading(true);
    try {
      const fetchedTransactions = await getTransactions(accountId);
      setTransactions(fetchedTransactions);
    } catch (error) {
      console.error("[Provider] Failed to fetch transactions. ERR: ", error);
    } finally {
      setLoading(false);
    }
  };

  const addNewTransaction = async (transaction, accountId) => {
    setLoading(true);
    try {
      const { id } = await addTransaction(transaction, accountId);
      const newTransaction = await getSingleTransaction(id);

      setTransactions((prevTransactions) => [
        ...prevTransactions,
        newTransaction,
      ]);
    } catch (error) {
      console.error("[Provider] Failed to add transaction. ERR: ", error);
    } finally {
      setLoading(false);
    }
  };

  const editExistingTransaction = async (transaction) => {
    setLoading(true);
    try {
      await editTransaction(transaction);
      await fetchTransactions(transaction.account_id);
    } catch (error) {
      console.error("[Provider] Failed to edit transaction. ERR: ", error);
    } finally {
      setLoading(false);
    }
  };

  const removeTransaction = async (transactionId) => {
    setLoading(true);
    try {
      await deleteTransaction(transactionId);
      setTransactions((prevTransactions) =>
        prevTransactions.filter(
          (transaction) => transaction.id !== transactionId,
        ),
      );
    } catch (error) {
      console.error("[Provider] Failed to delete transaction. ERR: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        loading,
        fetchTransactions,
        addNewTransaction,
        editExistingTransaction,
        removeTransaction,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
