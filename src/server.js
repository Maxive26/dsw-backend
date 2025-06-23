import app from "./app.js";
import { db } from "./config/db.js";
import initSucursalTable from "./models/sucursal.js";
import initProfesionalTable from "./models/profesional.js";
import initClienteTable from "./models/cliente.js";
const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await db.execute("SELECT 1");
    console.log("Conectado a la base de datos Turso");
    await initSucursalTable();
    await initProfesionalTable();
    await initClienteTable();
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Error al conectar con la base de datos:", error);
    process.exit(1);
  }
}

startServer();
