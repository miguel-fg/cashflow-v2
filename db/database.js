import * as SQLite from "expo-sqlite";

let db;

const initDB = async () => {
  if (!db) {
    db = await SQLite.openDatabaseAsync("app.db");
  }

  return db;
};

const createTables = async () => {
  try {
    const db = await initDB();
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL UNIQUE,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        salt TEXT
      );
      CREATE TABLE IF NOT EXISTS accounts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        name TEXT NOT NULL UNIQUE,
        currency TEXT NOT NULL,
        type TEXT,
        amount REAL DEFAULT 0,
        total_income REAL DEFAULT 0,
        total_expense REAL DEFAULT 0,
        credit BOOLEAN DEFAULT 0,
        FOREIGN KEY (user_id) REFERENCES users(id)
      );
      CREATE TABLE IF NOT EXISTS transactions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        account_id INTEGER,
        category TEXT,
        description TEXT,
        amount REAL,
        type TEXT,
        date TEXT,
        FOREIGN KEY (account_id) REFERENCES accounts(id)
      );
      CREATE TABLE IF NOT EXISTS budgets (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        account_id INTEGER,
        category TEXT,
        limit_amount REAL,
        current_amount REAL,
        FOREIGN KEY (account_id) REFERENCES accounts(id)
      );
    `);

    console.log("CF_SQLite Database Connected!");
  } catch (error) {
    console.error("CF_SQLite Database Failed to Connect", error);
  }
};

// DANGER ZONE
const dropTables = async () => {
  try {
    const db = await initDB();

    await db.execAsync(`
      DROP TABLE IF EXISTS transactions;
      DROP TABLE IF EXISTS budgets;
      DROP TABLE IF EXISTS accounts;
      DROP TABLE IF EXISTS users;
    `);

    console.log("CF_SQLite Tables Dropped.");
  } catch (error) {
    console.error("CF_SQLite Failed to Drop Tables", error);
  }
};

const logUsers = async () => {
  try {
    const db = await initDB();
    const results = await db.getAllAsync(`SELECT * FROM users`);
    for (const row of results) {
      console.log(row);
    }
  } catch (error) {
    console.error(`Failed to log contents of users`, error);
  }
};

const logAccounts = async () => {
  try {
    const db = await initDB();
    const results = await db.getAllAsync(`SELECT * FROM accounts`);
    for (const row of results) {
      console.log(row);
    }
  } catch (error) {
    console.error("Failed to log contents of accounts", error);
  }
};

const logTransactions = async () => {
  try {
    const db = await initDB();
    const results = await db.getAllAsync(`SELECT * FROM transactions`);
    for (const row of results) {
      console.log(row);
    }
  } catch (error) {
    console.error("Failed to log contents of transactions", error);
  }
};

const logBudgets = async () => {
  try {
    const db = await initDB();
    const results = await db.getAllAsync(`SELECT * FROM budgets`);
    for (const row of results) {
      console.log(row);
    }
  } catch (error) {
    console.error("Failed to log contents of budgets", error);
  }
};

const getUserIdByUsername = async (username) => {
  try {
    const db = await initDB();
    const result = await db.getFirstAsync(
      "SELECT * FROM users WHERE username = ?",
      [username],
    );

    return result.id;
  } catch (error) {
    console.error("Failed to fetch user ID. ERR: ", error);
    throw error;
  }
};

export {
  initDB,
  createTables,
  dropTables,
  logUsers,
  logAccounts,
  logTransactions,
  logBudgets,
  getUserIdByUsername,
};
