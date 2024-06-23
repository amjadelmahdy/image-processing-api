import { Request } from "express";
import path from "path";
import * as fs from "fs";
import sharp from "sharp";
import { ImgMeta } from "../models/ImgMeta";
import { RequestContent } from "../models/RequestContent";
import naming from "./naming";
import map from "./map";
import { records } from "../models/records";
import { AppError } from "../models/AppError";
const oDir = path.join(__dirname, "..", "..", "upload", "full");
const dDir = path.join(__dirname, "..", "..", "upload", "modified");
const recordsClass = new records();
sharp.cache(false);

async function process(req: Request): Promise<ImgMeta> {
  try {
    const { body, file } = req;

    if (!body || !file) {
      throw new AppError("Process Error", 400, "Missing file or request body!");
    }

    const r: RequestContent = {
      img_name: file.filename || "",
      format: body.format || "",
      width: parseInt(body.width) || NaN,
      height: parseInt(body.height) || NaN,
      quality: parseInt(body.quality),
      original_size: file.size || NaN,
      rotate: parseInt(body.rotate) || NaN,
      blur: parseInt(body.blur) || NaN,
      grayscale: body.grayscale || false,
      hue: parseInt(body.hue) || NaN,
      saturation: parseInt(body.saturation) || NaN,
      text: body.text || "",
      red: parseInt(body.red),
      green: parseInt(body.green),
      blue: parseInt(body.blue),
    };

    const fn = r.img_name.replace(/\.[^/.]+$/, ""); // Remove Extension
    const dFn = await naming(fn, r);
    const oFe = path.extname(file.filename).slice(1); // Original Extension

    const oPath = path.join(oDir, r.img_name);
    const dPath = path.join(dDir, dFn);

    // If the body is empty and no format is provided or if the provided format is the same as the file
    if (fn === dFn && (!r.format || oFe === r.format)) {
      throw new AppError(
        "Process Error",
        400,
        "Original & final names are matching. Params must be missing!",
      );
    }

    // If file exists, escape processing
    if (fs.existsSync(dPath + "." + (r.format || oFe))) {
      const size = fs.statSync(dPath + "." + (r.format || oFe)).size;

      const ImgInfo: ImgMeta = {
        img_name: dFn + "." + (r.format || oFe),
        format: r.format || oFe,
        width: r.width,
        height: r.height,
        quality: r.quality,
        size: size,
      };

      await recordsClass.success(body.req_id);
      return ImgInfo;
    }

    // If file does not exists

    const sharpInstance = sharp(oPath);
    await map(sharpInstance, r);

    const info = await sharpInstance.toFile(dPath + "." + (r.format || oFe));

    const ImgInfo: ImgMeta = {
      img_name: dFn + "." + (r.format || oFe),
      format: info.format,
      width: info.width,
      height: info.height,
      quality: r.quality,
      size: info.size,
    };

    await recordsClass.success(body.req_id);
    return ImgInfo;
  } catch (error) {
    await recordsClass.fail(req.body.req_id, (error as Error).message);
    throw error;
  }
}

export default process;
