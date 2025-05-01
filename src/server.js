import express from "express";
import sucursalRoutes from "./routes/sucursalRoutes.js";
import profesionalRoutes from "./routes/profesionalRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // Para poder recibir JSON en los requests

app.use("/sucursales", sucursalRoutes);
app.use("/profesionales", profesionalRoutes);

app.get("/", (req, res) => {
  res.send("Anda");
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
