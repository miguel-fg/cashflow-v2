import { initDB } from "./database";

const getAccounts = async (userId) => {
  try {
    const db = await initDB();
    const result = await db.getAllAsync(
      "SELECT * FROM accounts WHERE user_id = ?",
      [userId],
    );

    return result;
  } catch (error) {
    console.error("[Database] Failed to fetch accounts. ERR: ", error);
    throw error;
  }
};

const getSingleAccount = async (accountId) => {
  try {
    const db = await initDB();
    const result = await db.getFirstAsync(
      "SELECT * FROM accounts WHERE id = ?",
      [accountId],
    );

    return result;
  } catch (error) {
    console.error("[Database] Failed to fetch account. ERR: ", error);
    throw error;
  }
};

const addAccount = async (account, userId) => {
  const {
    name,
    currency,
    type,
    amount,
    total_income = 0,
    total_expense = 0,
    credit,
  } = account;

  try {
    const db = await initDB();
    const result = await db.runAsync(
      "INSERT INTO accounts (user_id, name, currency, type, amount, total_income, total_expense, credit) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [
        userId,
        name,
        currency,
        type,
        amount,
        total_income,
        total_expense,
        credit,
      ],
    );

    return { id: result.lastInsertRowId };
  } catch (error) {
    console.error("[Database] Failed to add account. ERR: ", error);
    throw error;
  }
};

const editAccount = async (account) => {
  const { id, name, currency, type, credit } = account;

  try {
    const db = await initDB();
    await db.runAsync(
      "UPDATE accounts SET name = ?, currency = ?, type = ?, credit = ? WHERE id = ?",
      [name, currency, type, credit, id],
    );
  } catch (error) {
    console.error("[Database] Failed to edit account. ERR: ", error);
    throw error;
  }
};

const updateAccountAmount = async (accountId, transactionAmount, type) => {
  try {
    const db = await initDB();
    const accountInfo = await db.getFirstAsync(
      "SELECT amount, total_income, total_expense FROM accounts WHERE id = ?",
      [accountId],
    );

    let newAmount = accountInfo.amount;
    let newIncome = accountInfo.total_income;
    let newExpense = accountInfo.total_expense;

    if (type === "Income") {
      newAmount += transactionAmount;
      newIncome += transactionAmount;
    } else {
      newAmount -= transactionAmount;
      newExpense += transactionAmount;
    }

    await db.runAsync(
      "UPDATE accounts SET amount = ?, total_income = ?, total_expense = ? WHERE id = ?",
      [newAmount, newIncome, newExpense, accountId],
    );
  } catch (error) {
    console.error("[Database] Failed to update account amount. ERR: ", error);
    throw error;
  }
};

const deleteAccount = async (accountId) => {
  try {
    const db = await initDB();
    await db.runAsync("DELETE FROM transactions WHERE account_id = ?", [
      accountId,
    ]);

    await db.runAsync("DELETE FROM accounts WHERE id = ?", [accountId]);
  } catch (error) {
    console.error("[Database] Failed to delete account. ERR: ", error);
    throw error;
  }
};

export {
  getAccounts,
  getSingleAccount,
  addAccount,
  editAccount,
  updateAccountAmount,
  deleteAccount,
};
