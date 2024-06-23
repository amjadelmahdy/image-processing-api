import express from "express";
import multer from "multer";
import storage from "../config/MulterConfig";
import { AppError } from "../models/AppError";
const sync = multer({ storage: storage }).single("file");

const upload = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  try {
    sync(req, res, (err: unknown) => {
      if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading.
        return next(
          new AppError(
            "MulterError",
            400,
            "Failed to upload the image, Check name attribute and enctype in the HTML doc!",
          ),
        );
      } else if (err) {
        // An unknown error occurred when uploading.
        return next(
          new AppError(
            "Unexpected MulterError",
            400,
            "Failed to upload the image with an unexpected error!",
          ),
        );
      }

      // Everything went fine.
      return next();
    });
  } catch (error) {
    return next(error);
  }
};

export default upload;
