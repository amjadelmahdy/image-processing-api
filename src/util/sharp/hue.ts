import sharp from "sharp";
import { AppError } from "../../models/AppError";

async function hue(sharpInstance: sharp.Sharp, hue: number) {
  if (!hue) {
    throw new AppError(
      "Service Error",
      400,
      "Missing mandatory Hue parameter for processing!",
    );
  }

  if (typeof hue != "number") {
    throw new AppError(
      "Service Error",
      400,
      "Expected a number but got another type!",
    );
  }

  if (hue < 1 || hue > 239) {
    throw new AppError(
      "Service Error",
      400,
      "Hue parameter should be from 1 to 239!",
    );
  }

  await sharpInstance.modulate({
    hue: hue,
  });

  return sharpInstance;
}

export default hue;
