import { initDB } from "./database";

const getBudgets = async (accountId) => {
  try {
    const db = await initDB();
    const result = await db.getAllAsync(
      "SELECT * FROM budgets WHERE account_id = ? ORDER BY id DESC",
      [accountId],
    );

    return result;
  } catch (error) {
    console.error("[Database] Failed to fetch budgets. ERR: ", error);
    throw error;
  }
};

const getSingleBudget = async (budgetId) => {
  try {
    const db = await initDB();
    const result = await db.getFirstAsync(
      "SELECT * FROM budgets WHERE id = ?",
      [budgetId],
    );

    return result;
  } catch (error) {
    console.error("[Database] Failed to fetch budget. ERR: ", error);
    throw error;
  }
};

const addBudget = async (budget, accountId) => {
  const { category, limit_amount, current_amount } = budget;

  try {
    const db = await initDB();
    const result = await db.runAsync(
      "INSERT INTO budgets (account_id, category, limit_amount, current_amount) VALUES (?, ?, ?, ?)",
      [accountId, category, limit_amount, current_amount],
    );

    return { id: result.lastInsertRowId };
  } catch (error) {
    console.error("[Database] Failed to insert budget. ERR: ", error);
    throw error;
  }
};

const editBudget = async (budget) => {
  const { id, category, limit_amount, current_amount } = budget;

  try {
    const db = await initDB();
    await db.runAsync(
      "UPDATE budgets SET category = ?, limit_amount = ?, current_amount = ? WHERE id = ?",
      [category, limit_amount, current_amount, id],
    );
  } catch (error) {
    console.error("[Database] Failed to update budget. ERR: ", error);
    throw error;
  }
};

const deleteBudget = async (budgetId) => {
  try {
    const db = await initDB();
    await db.runAsync("DELETE FROM budgets WHERE id = ?", [budgetId]);
  } catch (error) {
    console.error("[Database] Failed to delete budget. ERR: ", error);
    throw error;
  }
};

export { getBudgets, getSingleBudget, addBudget, editBudget, deleteBudget };
