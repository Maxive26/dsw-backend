import express from "express";
import {
  getAll,
  create,
  update,
  remove,
} from "../controllers/clienteController.js";

const router = express.Router();

router.get("/clientes", getAll);
router.post("/clientes", create);
router.put("/clientes/:dni", update);
router.delete("/clientes/:dni", remove);

export default router;