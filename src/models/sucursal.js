import { db } from "../config/db.js";

export default async function initSucursalTable() {
  await db.execute(`
    CREATE TABLE IF NOT EXISTS sucursal (
      idSucursal INTEGER PRIMARY KEY,
      nombre TEXT NOT NULL,
      direccion TEXT NOT NULL
    );
  `);
}
