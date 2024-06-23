import sharp from "sharp";
import { AppError } from "../../models/AppError";

async function rotate(sharpInstance: sharp.Sharp, rotate: number) {
  if (!rotate) {
    throw new AppError(
      "Service Error",
      400,
      "Missing mandatory rotate parameter for processing!",
    );
  }

  if (typeof rotate != "number") {
    throw new AppError(
      "Service Error",
      400,
      "Expected a number but got another type!",
    );
  }

  if (rotate < 1 || rotate > 360) {
    throw new AppError(
      "Service Error",
      400,
      "Rotate parameter should be from 1 to 360!",
    );
  }

  await sharpInstance.rotate(rotate, {
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  });

  return sharpInstance;
}

export default rotate;
