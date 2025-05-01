import app from "./app.js";
import { db } from "./config/db.js";

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await db.execute("SELECT 1");
    console.log("Conectado a la base de datos Turso");

    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Error al conectar con la base de datos:", error);
    process.exit(1);
  }
}

startServer();
