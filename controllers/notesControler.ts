import { NextFunction, Request, RequestHandler, Response } from "express";
import Note from "../models/notesModel.ts";
import AppError from "../utils/appError.ts";

// Catch-all route handler for undefined routes
const unhandledRoutes: RequestHandler = (req: Request, res:Response, next: NextFunction) => {
  next(new AppError("This Routes Are Not Defined", 404))
};

// Response body structure for the "getNotes" endpoint
interface ResponseNotesBody {  
  message?: string;
  notes?: string[];
  error?: string;
}


// GET ALL NOTES
const getNotes: RequestHandler<
  unknown,
  ResponseNotesBody,
  unknown,
  unknown
> = async (req, res): Promise<void> => {
  try {
    const notes: string[]= await Note.find();
    res.status(200).json({
      message: "Notes Found",
      notes,
    });
  } catch (error) {
    console.error("Error fetching notes:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// GET A NOTE
const getNote: RequestHandler = async (req, res): Promise<void> => {
  try {
    const id: string = req.params.id;

    const note = await Note.findById(id);

    if (!note) {
      res.status(404).json({
        message: "Note not found",
      });
    } else {
      res.status(200).json({
        message: "Note found",
        note,
      });
    }
  } catch (error) {
    console.error("Error fetching note:", error);

    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

// Request body structure for creating a new note
interface CreateNoteBody {
  title?: string;
  description?: string;
}

// CREATE A NEW NOTE
const createNote: RequestHandler<
  unknown,
  unknown,
  CreateNoteBody,
  unknown
> = async (req, res) => {
  try {
    const body = req.body as CreateNoteBody;
    const note = await Note.create({
      ...body,
    });
    res.status(201).json({
      message: "Note Created",
      note,
    });
  } catch (error) {
    console.error("Error creating note:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { getNotes, createNote, getNote, unhandledRoutes };
