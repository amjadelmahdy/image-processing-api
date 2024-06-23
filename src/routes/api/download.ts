import express, { NextFunction, Request, Response } from "express";
import * as path from "path";
import * as fs from "fs";
import { AppError } from "../../models/AppError";
const download = express.Router();
const dDir = path.join(__dirname, "..", "..", "..", "upload", "modified");

download.get(
  "/:img_name",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.params) {
        throw new AppError(
          "Download Error",
          400,
          "Cannot GET undefined image name!",
        );
      }

      const img_name = req.params["img_name"];
      const dPath = path.join(dDir, img_name);

      // If image not found
      if (!fs.existsSync(path.join(dDir, img_name))) {
        return next(new AppError("Not Found", 404, "Resource not found!"));
      }

      res.download(dPath);
    } catch (error) {
      return next(error);
    }
  },
);

download.get("/", (req: Request, res: Response, next: NextFunction) => {
  try {
    throw new AppError(
      "Download Error",
      400,
      "Cannot GET undefined image name!",
    );
  } catch (error) {
    return next(error);
  }
});

export default download;
