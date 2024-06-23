import sharp from "sharp";
import { AppError } from "../../models/AppError";

async function tint(
  sharpInstance: sharp.Sharp,
  red: number,
  green: number,
  blue: number,
) {
  if (!red && !green && !blue) {
    throw new AppError(
      "Service Error",
      400,
      "Missing mandatory tint parameter for processing!",
    );
  }

  if (
    typeof red != "number" ||
    typeof green != "number" ||
    typeof blue != "number"
  ) {
    throw new AppError(
      "Service Error",
      400,
      "Expected a number but got another type!",
    );
  }

  if (
    0 > red ||
    255 < red ||
    0 > green ||
    255 < green ||
    0 > blue ||
    255 < blue
  ) {
    throw new AppError(
      "Service Error",
      400,
      "Tint parameters should be from 1 to 255!",
    );
  }

  await sharpInstance.tint({
    r: red || 0,
    g: green || 0,
    b: blue || 0,
  });

  return sharpInstance;
}

export default tint;
