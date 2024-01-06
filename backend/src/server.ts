// Import necessary modules and configurations
import "dotenv/config";
import express from "express";
import connectToMongo from "../configs/connectToDb.ts";
import router from "../routes/notesRoutes.ts";
import { unhandledRoutes } from "../controllers/notesControler.ts";
import globalErrorHandler from "../controllers/errorController.ts";

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
app.use(globalErrorHandler);

// Start the Express server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
