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

    console.log("CF_SQLite Database Connected!");
  } catch (error) {
    console.error("CF_SQLite Database Failed to Connect", error);
  }
};

const logUsers = async () => {
  try {
    const db = await initDB();
    const results = await db.getAllAsync(`SELECT * FROM users`);
    for (const row of results) {
      console.log(row.id, row.username, row.email, row.password);
    }
  } catch (error) {
    console.error(`Failed to log contents of users`, error);
  }
};

export { initDB, createTables, logUsers };
