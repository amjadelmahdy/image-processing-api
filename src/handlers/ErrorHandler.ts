import { Request, Response, NextFunction } from "express";
import { AppError } from "../models/AppError";
import winLogs from "../config/WinstongConfig";
class ErrorHandler {
  handle(
    error: Error,
    req: Request,
    res: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    __next: NextFunction,
  ) {
    // If error is trusted
    if (error instanceof AppError) {
      return res.status(error.httpCode).json({
        error: error.name,
        message: error.message,
      });
    }

    // If unknown error caught

    // Log the error into logs/file-log-error.log
    winLogs.error({
      status: 500,
      msg: error.message,
      oURL: req.originalUrl,
      method: req.method,
      ip: req.ip,
      body: req.body,
    });

    res.status(500).json({
      error: "Server Error",
      message: "Ops!, something went wrong!",
      details: {
        errName: error.name,
        errMsg: error.message,
      },
    });

    // Worst case scenario. Uncaught Exception
    process.on("uncaughtException", () => {
      process.exit(1);
    });
  }
}

export const errorHandler = new ErrorHandler().handle;
