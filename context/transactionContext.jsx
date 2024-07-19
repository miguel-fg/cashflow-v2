import React, { createContext, useState, useContext, useEffect } from "react";
import {
  getTransactions,
  getSingleTransaction,
  addTransaction,
  editTransaction,
  deleteTransaction,
} from "../db/transactionService";
import { AccountContext } from "./accountsContext";

export const TransactionContext = createContext();

export const TransactionProvider = ({ children }) => {
  const { selectedAccount } = useContext(AccountContext);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTransactions = async () => {
    if (selectedAccount) {
      setLoading(true);
      try {
        const fetchedTransactions = await getTransactions(selectedAccount.id);
        setTransactions(fetchedTransactions);
      } catch (error) {
        console.error("[Provider] Failed to fetch transactions. ERR: ", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const addNewTransaction = async (transaction) => {
    if (selectedAccount) {
      setLoading(true);
      try {
        const { id } = await addTransaction(transaction, selectedAccount.id);
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
    }
  };

  const editExistingTransaction = async (transaction) => {
    setLoading(true);
    try {
      await editTransaction(transaction);
      setTransactions((prevTransactions) => {
        prevTransactions.map((t) =>
          t.id === transaction.id ? { ...t, ...transaction } : t,
        );
      });
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

  useEffect(() => {
    fetchTransactions();
  }, [selectedAccount]);

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
