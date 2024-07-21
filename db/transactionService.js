import { initDB } from "./database";

const getTransactions = async (accountId) => {
  try {
    const db = await initDB();
    const result = await db.getAllAsync(
      "SELECT * FROM transactions WHERE account_id = ? ORDER BY id DESC",
      [accountId],
    );

    return result;
  } catch (error) {
    console.error("[Database] Failed to fetch transactions. ERR: ", error);
    throw error;
  }
};

const getSingleTransaction = async (transactionId) => {
  try {
    const db = await initDB();
    const result = await db.getFirstAsync(
      "SELECT * FROM transactions WHERE id = ?",
      [transactionId],
    );

    return result;
  } catch (error) {
    console.error("[Database] Failed to fetch transaction. ERR: ", error);
    throw error;
  }
};

const addTransaction = async (transaction, accountId) => {
  const {
    category,
    description,
    amount,
    type,
    date = new Date().toISOString(),
  } = transaction;

  try {
    const db = await initDB();
    const result = await db.runAsync(
      "INSERT INTO transactions (account_id, category, description, amount, type, date) VALUES (?, ?, ?, ?, ?, ?)",
      [accountId, category, description, amount, type, date],
    );

    return { id: result.lastInsertRowId };
  } catch (error) {
    console.log("[Database] Failed to insert transaction. ERR: ", error);
    throw error;
  }
};

const editTransaction = async (transaction) => {
  const { id, category, description, amount, type } = transaction;

  try {
    const db = await initDB();
    await db.runAsync(
      "UPDATE transactions SET category = ?, description = ?, amount = ?, type = ? WHERE id = ?",
      [category, description, amount, type, id],
    );
  } catch (error) {
    console.log("[Database] Failed to update transaction. ERR: ", error);
    throw error;
  }
};

const deleteTransaction = async (transactionId) => {
  try {
    const db = await initDB();
    await db.runAsync("DELETE FROM transactions WHERE id = ?", [transactionId]);
  } catch (error) {
    console.error("[Database] Failed to delete transaction. ERR: ", error);
    throw error;
  }
};

export {
  getTransactions,
  getSingleTransaction,
  addTransaction,
  editTransaction,
  deleteTransaction,
};
