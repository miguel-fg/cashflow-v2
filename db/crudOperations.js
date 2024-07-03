import db from "./database.js";

// Create new user
export const createUser = async (user) => {
  try {
    const result = await db.put({ ...user, _id: `user_${user.id}` });
    return result;
  } catch (error) {
    console.error(error);
  }
};

// Create a new account
export const createAccount = async (account) => {
  try {
    const result = await db.put({ ...account, _id: `account_${account.id}` });
    return result;
  } catch (error) {
    console.error(error);
  }
};

// Add a transaction and update account balances
export const addTransaction = async (transaction) => {
  try {
    const account = await db.get(`account_${transaction.accountID}`);

    if (transaction.type === "Income") {
      account.balance += transaction.amount;
      account.totalIncome += transaction.amount;
    } else {
      account.balance -= transaction.amount;
      account.totalExpenses += transaction.amount;
    }

    await db.put(account); // Update account figures

    const result = await db.put({
      ...transaction,
      _id: `transaction_${transaction.id}`,
    });
    return result;
  } catch (error) {
    console.error(error);
  }
};

// Fetch all transactions for an account
export const fetchTransactions = async (accountID) => {
  try {
    const result = await db.find({
      selector: { accountID },
      sort: [{ date: "desc" }],
    });

    return result.docs;
  } catch (error) {
    console.error(error);
  }
};
