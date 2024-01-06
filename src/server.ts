// Import necessary modules and configurations
import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import connectToMongo from "../configs/connectToDb.ts";
import router from "../routes/notesRoutes.ts";
import { unhandledRoutes } from "../controllers/notesControler.ts";
import AppError from "../utils/appError.ts";

// Create an instance of the Express application
const app = express();

// Middleware to parse incoming JSON requests
app.use(express.json());

// Connect to MongoDB using the configured function
connectToMongo();

// Set the port from the environment variables
const PORT = process.env.PORT;

// Use the defined router for handling routes starting with "/api/v1/notes"
app.use("/api/v1/notes", router);

// Catch all unhandled routes and direct them to the unhandledRoutes controller
app.all("*", unhandledRoutes);

// Error handling middleware
app.use((error: AppError, req: Request, res: Response, next: NextFunction) => {
  // Log the error stack trace
  console.log(error.stack);

  // Extract status and statusCode from the error, default to "Error" and 400 if not present
  const status = error.status || "Error";
  const statusCode = error.statusCode || 400;

  // Send a JSON response with the error details and status code
  res.status(statusCode).json({ status, message: error.message });

  // Call the next middleware
  next();
});

// Start the Express server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
