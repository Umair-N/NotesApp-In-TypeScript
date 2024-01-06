import { NextFunction, Request, Response } from "express";
import AppError from "../utils/appError";

const globalErrorHandler = (
  error: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Extract status and statusCode from the error, default to "Error" and 400 if not present
  error.status = error.status || "Error";
  error.statusCode = error.statusCode || 400;

  // Send a JSON response with the error details and status code
  res.status(error.statusCode).json({
    status: error.status,
    message: error.message,
    ErrorStack: error.stack,
    error,
  });
};

export default globalErrorHandler