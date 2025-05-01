import express from "express";
import {
  getAll,
  create,
  update,
  remove,
} from "../controllers/sucursalController.js";

const router = express.Router();

router.get("/sucursales", getAll);
router.post("/sucursales", create);
router.put("/sucursales/:id", update);
router.delete("/sucursales/:id", remove);

export default router;
