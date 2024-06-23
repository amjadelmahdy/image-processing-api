import sharp from "sharp";
import { RequestContent } from "../models/RequestContent";
import rotate from "./sharp/rotate";
import hue from "./sharp/hue";
import saturation from "./sharp/saturation";
import grayscale from "./sharp/grayscale";
import addText from "./sharp/text";
import blur from "./sharp/blur";
import tint from "./sharp/tint";
import optimize from "./sharp/optimize";
import { AppError } from "../models/AppError";

// remember to make this a switch
async function map(
  sharpInstance: sharp.Sharp,
  r: RequestContent,
): Promise<sharp.Sharp> {
  if (!sharpInstance) {
    throw new AppError("Map Error", 400, "Missing a file to process!");
  }

  if (
    r.format ||
    (r.width && r.height) ||
    (r.quality >= 1 && r.quality < 100)
  ) {
    await optimize(sharpInstance, r.width, r.height, r.quality, r.format);
  }

  if (r.rotate) {
    await rotate(sharpInstance, r.rotate);
  }

  if (r.blur) {
    await blur(sharpInstance, r.blur);
  }

  if (r.hue) {
    await hue(sharpInstance, r.hue);
  }

  if (r.saturation) {
    await saturation(sharpInstance, r.saturation);
  }

  if (r.red || r.green || r.blue) {
    await tint(sharpInstance, r.red, r.green, r.blue);
  }

  if (r.grayscale) {
    await grayscale(sharpInstance, r.grayscale);
  }

  if (r.text) {
    await addText(sharpInstance, r.text);
  }

  return sharpInstance;
}

export default map;
