import { Router } from "express";
import {
  createNotes,
  deleteNote,
  getAllNotes,
  updateNotes,
} from "../controllers/notes.ct.js";
const router = Router();

router.get("/getnotes", getAllNotes);

router.post("/createnote", createNotes);

router.put("/:id", updateNotes);

router.delete("/:id", deleteNote);

export default router;
