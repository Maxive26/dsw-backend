import { db } from "../config/db.js";

export default async function initProfesionalTable() {
  await db.execute(`
    CREATE TABLE IF NOT EXISTS profesional (
      legajo INTEGER PRIMARY KEY,
      nombre TEXT NOT NULL,
      mail TEXT UNIQUE NOT NULL,
      idSucursal INTEGER NOT NULL,
      FOREIGN KEY (idSucursal) REFERENCES sucursal(idSucursal)
    );
  `);
}
