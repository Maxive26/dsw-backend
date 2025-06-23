import { db } from "../config/db.js";

export default async function initClienteTable() {
  await db.execute(`
    CREATE TABLE IF NOT EXISTS cliente (
      DNI INTEGER PRIMARY KEY,
      nombre TEXT NOT NULL,
      mail TEXT UNIQUE NOT NULL
    );
  `);
}