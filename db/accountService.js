import { initDB } from "./database";

const getAccounts = async (userId) => {
  try {
    const db = initDB();
    const result = await db.getAllAsync(
      "SELECT * FROM accounts WHERE user_id = ?",
      [userId],
    );

    return result;
  } catch (error) {
    console.error("Failed to fetch accounts. ERR:", error);
    throw error;
  }
};

const addAccount = async (account) => {
  const {
    user_id,
    name,
    currency,
    type,
    amount,
    total_income = 0,
    total_expense = 0,
    credit,
  } = account;

  try {
    const db = initDB();
    const result = await db.runAsync(
      "INSERT INTO accounts (user_id, name, currency, type, amount, credit) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [
        user_id,
        name,
        currency,
        type,
        amount,
        total_income,
        total_expense,
        credit,
      ],
    );

    return result;
  } catch (error) {
    console.error("Failed to add account. ERR: ", error);
    throw error;
  }
};

const editAccount = async (account) => {
  const { user_id, id, name, currency, type, credit } = account;

  try {
    const db = initDB();
    const result = await db.runAsync(
      "UPDATE accounts SET name = ?, currency = ?, type = ?, credit = ? WHERE user_id = ? AND id = ?",
      [name, currency, type, credit, user_id, id],
    );

    return result;
  } catch (error) {
    console.error("Failed to edit account. ERR: ", error);
    throw error;
  }
};

const updateAccountAmount = async (accountId, transactionAmount, type) => {
  try {
    const db = initDB();
    const accountInfo = await db.getFirstAsync(
      "SELECT amount, total_income, total expense FROM accounts WHERE id = ?",
      [accountId],
    );

    if (type === "Income") {
      const newAmount = accountInfo.amount + transactionAmount;
      const newIncome = accountInfo.total_income + transactionAmount;

      const result = await db.runAsync(
        "UPDATE accounts SET amount = ?, total_income = ? WHERE id = ?",
        [newAmount, newIncome, accountId],
      );

      return result;
    } else {
      const newAmount = accountInfo.amount - transactionAmount;
      const newExpense = accountInfo.total_expense + transactionAmount;

      const result = await db.runAsync(
        "UPDATE accounts SET amount = ?, total_expense =? WHERE id = ?",
        [newAmount, newExpense, accountId],
      );

      return result;
    }
  } catch (error) {
    console.error("Failed to update account amount. ERR: ", error);
    throw error;
  }
};

const deleteAccount = async (accountId) => {
  try {
    const db = initDB();
    const resultTransactions = await db.runAsync(
      "DELETE FROM transactions WHERE account_id = ?",
      [accountId],
    );

    const resultAccounts = await db.runAsync(
      "DELETE FROM accounts WHERE id = ?",
      [accountId],
    );

    return { resultTransactions, resultAccounts };
  } catch (error) {
    console.error("Failed to delete account. ERR: ", error);
    throw error;
  }
};

export {
  getAccounts,
  addAccount,
  editAccount,
  updateAccountAmount,
  deleteAccount,
};
