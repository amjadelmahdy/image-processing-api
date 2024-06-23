import sharp from "sharp";
import { AppError } from "../../models/AppError";

async function grayscale(
  sharpInstance: sharp.Sharp,
  grayscale: boolean | string,
) {
  if (!grayscale) {
    throw new AppError(
      "Service Error",
      400,
      "Missing mandatory grayscale parameter for processing!",
    );
  }

  if (grayscale != "true") {
    throw new AppError(
      "Service Error",
      400,
      "Grayscale value is not set to true!",
    );
  }

  await sharpInstance.grayscale();

  return sharpInstance;
}

export default grayscale;
