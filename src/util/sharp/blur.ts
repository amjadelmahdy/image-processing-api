import sharp from "sharp";
import { AppError } from "../../models/AppError";

async function blur(
  sharpInstance: sharp.Sharp,
  blr: number,
): Promise<sharp.Sharp> {
  if (!blr) {
    throw new AppError(
      "Service Error",
      400,
      "Missing mandatory blur parameter for processing!",
    );
  }

  if (typeof blr != "number") {
    throw new AppError(
      "Service Error",
      400,
      "Expected a number but got another type!",
    );
  }

  if (blr < 1 || blr > 1000) {
    throw new AppError(
      "Service Error",
      400,
      "Blur parameter should be from 1 to 1000!",
    );
  }

  await sharpInstance.blur(blr);
  return sharpInstance;
}

export default blur;
