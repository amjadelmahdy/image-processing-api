import express, { NextFunction, Request, Response } from "express";
import * as path from "path";
import image from "./api/image";
import optimize from "./api/optimize";
import download from "./api/download";

const routes = express.Router();
const homePage = path.join(__dirname, "..", "..", "website", "home.html");

routes.get("/", (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).sendFile(homePage);
  } catch (error) {
    return next(error);
  }
});

routes.use("/image", image);
routes.use("/download", download);
routes.use("/optimize", optimize);
routes.use(express.static(path.join(__dirname, "..", "..", "website")));

routes.use("*", (req: Request, res: Response, next: NextFunction) => {
  try {
    throw new Error("Unsupported route!");
  } catch (error) {
    return next(error);
  }
});

export default routes;
