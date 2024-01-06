import { NextFunction, Request, RequestHandler, Response } from "express";
import Note from "../models/notesModel.ts";
import AppError from "../utils/appError.ts";
import catchAsync from "../utils/catchAsync.ts";

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
const getNotes: RequestHandler = catchAsync(
  async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    // Fetch all notes from the database
    const notes: string[] = await Note.find();

    if (!notes) {
      return next(new AppError("Cannot Find Notes", 404));
    }
    // Send a JSON response with the fetched notes
    res.status(200).json({
      message: "Notes Found",
      notes,
    });
  }
);

// GET A NOTE
const getNote: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    // Extract the note ID from the request parameters
    const id: string = req.params.id;

    // Find the note by ID in the database
    const note = await Note.findById(id);

    if (!note) {
      return next(new AppError("Cannot Find The Note With this ID", 404));
    }
    // Check if the note exists and send the appropriate response
    res.status(200).json({
      message: "Note found",
      note,
    });
  }
);

// Request body structure for creating a new note
interface CreateNoteBody {
  title?: string;
  description?: string;
}

// CREATE A NEW NOTE
const createNote: RequestHandler = catchAsync(
  async (
    req: Request<unknown, unknown, CreateNoteBody, unknown>,
    res: Response,
    next: NextFunction
  ) => {
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
  }
);

// UPDATE A NOTE

const updateNote: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id: string = req.params.id;
    const note = await Note.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!note) return next(new AppError("The note was not found", 404));
    res.status(200).json({
      success: true,
      message: "Note Updated",
      note,
    });
  }
);
// CREATE A NOTE
const deleteNote: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // Find the note to be deleted by its ID
    const id: string = req.params.id;

    const note = await Note.findByIdAndDelete(id);
    if (!note) {
      return next(new AppError("No note found with that Id", 404));
    }
    // Return a success message
    res.status(204).json({
      status: "success",
      note,
    });
  }
);
// Export the route handlers for use in other files
export { getNotes, createNote, getNote, updateNote ,deleteNote, unhandledRoutes };
