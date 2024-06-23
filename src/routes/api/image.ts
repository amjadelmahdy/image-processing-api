import express, { NextFunction, Request, Response } from "express";
import * as path from "path";
import * as fs from "fs";
import * as fsp from "fs/promises";
import { AppError } from "../../models/AppError";
const image = express.Router();
const dDir = path.join(__dirname, "..", "..", "..", "upload", "modified");

image.get(
  "/:img_name",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.params) {
        throw new AppError(
          "Image Error",
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

      const img = await fsp.readFile(dPath);

      res.end(img);
    } catch (error) {
      return next(error);
    }
  },
);

image.get("/", (req: Request, res: Response, next: NextFunction) => {
  try {
    throw new AppError("Image Error", 400, "Cannot GET undefined image name!");
  } catch (error) {
    return next(error);
  }
});

export default image;
