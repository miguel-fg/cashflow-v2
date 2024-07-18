import { initDB } from "./database";

const getTransactions = async (accountId) => {
  try {
    const db = initDB();
    const result = await db.getAllAsync(
      "SELECT * FROM transactions WHERE account_id = ?",
      [accountId],
    );

    return result;
  } catch (error) {
    console.error("Failed to fetch transactions. ERR: ", error);
    throw error;
  }
};

const addTransaction = async (transaction) => {
  const {
    account_id,
    category,
    description,
    amount,
    type,
    date = new Date().toISOString(),
  } = transaction;

  try {
    const db = initDB();
    const result = await db.runAsync(
      "INSERT INTO transactions (account_id, category, description, amount, type, date) VALUES (?, ?, ?, ?, ?, ?)",
      [account_id, category, description, amount, type, date],
    );

    return result;
  } catch (error) {
    console.log("Failed to insert transaction. ERR: ", error);
    throw error;
  }
};

const editTransaction = async (transaction) => {
  const { id, account_id, category, description, amount, type } = transaction;

  try {
    const db = initDB();
    const result = await db.runAsync(
      "UPDATE transactions SET category = ?, description = ?, amount = ?, type = ? WHERE id = ? AND account_id = ?",
      [category, description, amount, type, id, account_id],
    );

    return result;
  } catch (error) {
    console.log("Failed to update transaction. ERR: ", error);
    throw error;
  }
};

const deleteTransaction = async (transactionId) => {
  try {
    const db = initDB();
    const result = await db.runAsync("DELETE FROM transactions WHERE id = ?", [
      transactionId,
    ]);

    return result;
  } catch (error) {
    console.error("Failed to delete transaction. ERR: ", error);
    throw error;
  }
};

export { getTransactions, addTransaction, editTransaction, deleteTransaction };
