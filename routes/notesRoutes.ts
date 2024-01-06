import express from "express";
import {createNote, getNote, getNotes}  from "../controllers/notesControler.ts";

const router = express.Router()

router.route("/").get(getNotes).post(createNote)
router.route("/:id").get(getNote)
export default router

