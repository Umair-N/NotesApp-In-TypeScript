import { NextFunction, Request, RequestHandler, Response } from "express";
import Note from "../models/notesModel.ts";
import AppError from "../utils/appError.ts";

// Catch-all route handler for undefined routes
const unhandledRoutes: RequestHandler = (
  _req: Request,
  _res: Response,
  next: NextFunction
) => {
  // Create and pass an AppError with a 404 status and a custom message
  next(new AppError("This Routes Are Not Defined", 404));
};

// GET ALL NOTES
const getNotes: RequestHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // Fetch all notes from the database
    const notes: string[] = await Note.find();

    // Send a JSON response with the fetched notes
    res.status(200).json({
      message: "Notes Found",
      notes,
    });
  } catch (error) {
    // Handle errors and send a 500 Internal Server Error response
    console.error("Error fetching notes:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// GET A NOTE
const getNote: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    // Extract the note ID from the request parameters
    const id: string = req.params.id;

    // Find the note by ID in the database
    const note = await Note.findById(id);

    // Check if the note exists and send the appropriate response
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
    // Handle errors and send a 500 Internal Server Error response
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
const createNote: RequestHandler = async (
  req: Request<unknown, unknown, CreateNoteBody, unknown>,
  res: Response
) => {
  try {
    // Extract the request body and create a new note in the database
    const body = req.body;
    const note = await Note.create({
      title: body.title,
      description: body.description,
    });

    // Send a JSON response with the created note
    res.status(201).json({
      message: "Note Created",
      note,
    });
  } catch (error) {
    // Handle errors and send a 500 Internal Server Error response
    console.error("Error creating note:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Export the route handlers for use in other files
export { getNotes, createNote, getNote, unhandledRoutes };
