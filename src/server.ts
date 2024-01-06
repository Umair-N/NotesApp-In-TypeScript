import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import connectToMongo from "../configs/connectToDb.ts";
import router from "../routes/notesRoutes.ts";
import { unhandledRoutes } from "../controllers/notesControler.ts";
import AppError from "../utils/appError.ts";
const app = express();

app.use(express.json());
connectToMongo();

const PORT = process.env.PORT;

app.use("/api/v1/notes", router);

app.all("*", unhandledRoutes);

app.use((error: AppError, req: Request, res: Response, next: NextFunction) => {
  console.log(error.stack);

  const status = error.status || "Error";
  const statusCode = error.statusCode || 400;
  res.status(statusCode).json({ status, messaage: error.message });

  next();
});
app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
