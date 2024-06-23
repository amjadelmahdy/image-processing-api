import { Request, Response, NextFunction } from "express";
import { records, record } from "../models/records";
const recs = new records();

const logger = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { body, file, headers } = req;
    const req_id: number = Math.floor(100000 + Math.random() * 900000);

    // Request starter status is: On-Hold
    const row: record = {
      req_id: req_id,
      client: String(req.ip),
      req_content: body,
      status: "On-Hold",
      file_name: file?.filename,
      browser: headers["sec-ch-ua"],
      user_agent: headers["user-agent"],
    };

    await recs.insert(row);
    req.body.req_id = req_id;

    next();
  } catch (error) {
    return next(error);
  }
};

export default logger;
