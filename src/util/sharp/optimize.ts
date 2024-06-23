import sharp from "sharp";
import { AppError } from "../../models/AppError";

async function optimize(
  sharpInstance: sharp.Sharp,
  width: number,
  height: number,
  quality: number,
  format: string,
): Promise<sharp.Sharp> {
  if (quality < 1 || quality > 100) {
    throw new AppError(
      "Service Error",
      400,
      "Quality parameter should be from 1 to 100!",
    );
  }

  if (
    typeof width != "number" ||
    typeof height != "number" ||
    typeof quality != "number"
  ) {
    throw new AppError(
      "Service Error",
      400,
      "Expected a number but got another type!",
    );
  }

  // If width provided with no height, or vice versa
  if ((isNaN(width) || isNaN(height)) && !(isNaN(width) && isNaN(height))) {
    throw new AppError(
      "Service Error",
      400,
      "Missing mandatory resize parameter for processing!",
    );
  }

  if (format) {
    if (format != "jpeg" && format != "webp" && format != "png") {
      throw new AppError(
        "Service Error",
        400,
        "Format must be one from (png, jpeg, webp)!",
      );
    }
  }

  if (width && height) {
    await sharpInstance.resize({
      width: width,
      height: height,
      fit: "contain",
    });
    // console.log("Resize Done!");
  }

  const metadata = await sharpInstance.metadata();

  if (
    metadata.format != "jpg" &&
    metadata.format != "jpeg" &&
    metadata.format != "webp" &&
    metadata.format != "png"
  ) {
    throw new AppError("Service Error", 400, "File format is not supported!");
  }

  switch (format || metadata.format) {
    case "jpeg" || "jpg":
      await sharpInstance
        .toFormat("jpeg", { mozjpeg: true })
        .jpeg({ quality: quality || 100 });
      break;
    case "webp":
      await sharpInstance
        .toFormat("webp", { lossless: true })
        .webp({ quality: quality || 100 });
      break;
    default:
      await sharpInstance.toFormat("png").png({ compressionLevel: 7 });
      break;
  }

  return sharpInstance;
}

export default optimize;
