import { mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { DatabaseSync } from "node:sqlite";

export type Subscriber = {
  email: string;
  createdAt: string;
  emailSentAt: string | null;
};

function databasePath() {
  return process.env.SUBSCRIBERS_DB_PATH || join(process.cwd(), "data", "subscribers.sqlite");
}

function openDatabase() {
  const path = databasePath();
  mkdirSync(dirname(path), { recursive: true });
  const database = new DatabaseSync(path);
  database.exec(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS subscribers (
      email TEXT PRIMARY KEY,
      created_at TEXT NOT NULL,
      email_sent_at TEXT
    );
  `);
  return database;
}

export function saveSubscriber(email: string): Subscriber {
  const database = openDatabase();
  const createdAt = new Date().toISOString();

  try {
    database
      .prepare("INSERT OR IGNORE INTO subscribers (email, created_at) VALUES (?, ?)")
      .run(email, createdAt);
    const row = database
      .prepare("SELECT email, created_at, email_sent_at FROM subscribers WHERE email = ?")
      .get(email) as { email: string; created_at: string; email_sent_at: string | null };

    return { email: row.email, createdAt: row.created_at, emailSentAt: row.email_sent_at };
  } finally {
    database.close();
  }
}

export function markWelcomeEmailSent(email: string) {
  const database = openDatabase();
  try {
    database
      .prepare("UPDATE subscribers SET email_sent_at = ? WHERE email = ?")
      .run(new Date().toISOString(), email);
  } finally {
    database.close();
  }
}
