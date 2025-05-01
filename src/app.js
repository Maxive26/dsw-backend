import express from "express";
import sucursalRoutes from "./routes/sucursalRoutes.js";
import profesionalRoutes from "./routes/profesionalRoutes.js";

const app = express();

app.use(express.json());

app.use("/api", sucursalRoutes);
app.use("/api", profesionalRoutes);

app.get("/", (req, res) => {
  res.send("Anda");
});

export default app;
