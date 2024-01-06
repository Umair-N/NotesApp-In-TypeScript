import express from "express";
import {createNote, deleteNote, getNote, getNotes, updateNote}  from "../controllers/notesControler.ts";

const router = express.Router()

router.route("/").get(getNotes).post(createNote)
router.route("/:id").get(getNote).delete(deleteNote).put(updateNote)
export default router

