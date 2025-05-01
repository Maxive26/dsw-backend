import express from "express";
import {
  getAll,
  create,
  update,
  remove,
} from "../controllers/profesionalController.js";

const router = express.Router();

router.get("/profesionales", getAll);
router.post("/profesionales", create);
router.put("/profesionales/:legajo", update);
router.delete("/profesionales/:legajo", remove);

export default router;
