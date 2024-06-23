import sharp from "sharp";
import { AppError } from "../../models/AppError";

async function saturation(sharpInstance: sharp.Sharp, saturation: number) {
  if (!saturation) {
    throw new AppError(
      "Service Error",
      400,
      "Missing mandatory saturation parameter for processing!",
    );
  }

  if (typeof saturation != "number") {
    throw new AppError(
      "Service Error",
      400,
      "Expected a number but got another type!",
    );
  }

  if (saturation < 1 || saturation > 239) {
    throw new AppError(
      "Service Error",
      400,
      "Saturation parameter should be from 1 to 239!",
    );
  }

  await sharpInstance.modulate({
    saturation: saturation,
  });

  return sharpInstance;
}

export default saturation;
