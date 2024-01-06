interface CustomError extends Error {
  statusCode: number;
  status: string;
  isOperational: boolean;
}

class AppError extends Error implements CustomError {
  statusCode: number;
  status: string;
  isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);

    this.statusCode = statusCode;
    this.status = statusCode >= 400 && statusCode < 500 ? "Fail" : "Error";
    this.isOperational = true;

    // Set the prototype explicitly to ensure proper inheritance
    Object.setPrototypeOf(this, AppError.prototype);

    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
