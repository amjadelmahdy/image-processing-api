import express, { Request, Response, NextFunction } from "express";
import process from "../../util/process";
import logger from "../../handlers/logger";
import upload from "../../handlers/upload";
import validate from "../../handlers/validate";
import { ImgMeta } from "../../models/ImgMeta";
const optimize = express.Router();

optimize.post(
  "/",
  upload,
  logger,
  validate,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const ImgInfo: ImgMeta = await process(req);

      res.status(201).send({
        batch_id: req.body.req_id,
        details: ImgInfo,
      });
    } catch (error) {
      return next(error);
    }
  },
);

export default optimize;
