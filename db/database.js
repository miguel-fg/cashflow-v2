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
        password TEXT NOT NULL
      );
      CREATE TABLE IF NOT EXISTS accounts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        currency TEXT,
        type TEXT,
        amount REAL DEFAULT 0,
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
    `);

    console.log("Tables created successfully");
  } catch (error) {
    console.log("Error creating tables: ", error);
  }
};

const logTable = async (tableName) => {
  try {
    const db = await initDB();
    const results = await db.execAsync(`SELECT * FROM ${tableName}`);
    console.log(`Contents of ${tableName}:`, results);
  } catch (error) {
    console.error(`Failed to log contents of ${tableName}: `, error);
  }
};

export { initDB, createTables, logTable };
