import express from "express";
import sucursalRoutes from "./routes/sucursalRoutes.js";
import profesionalRoutes from "./routes/profesionalRoutes.js";
import clienteRoutes from "./routes/clienteRoutes.js"

const app = express();

app.use(express.json());

app.use("/api", sucursalRoutes);
app.use("/api", profesionalRoutes);
app.use("/api", clienteRoutes)

app.get("/", (req, res) => {
  res.send("Anda");
});

export default app;
