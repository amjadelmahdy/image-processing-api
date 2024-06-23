import sharp from "sharp";
import { AppError } from "../../models/AppError";

async function addText(sharpInstance: sharp.Sharp, text: string) {
  if (!text) {
    throw new AppError(
      "Service Error",
      400,
      "Missing mandatory text parameter for processing!",
    );
  }

  if (typeof text != "string") {
    throw new AppError(
      "Service Error",
      400,
      "Expected a string but got another type!",
    );
  }

  if (text.length > 20) {
    throw new AppError(
      "Service Error",
      400,
      "Text string should be 20 characters length maximum!",
    );
  }

  const width = (await sharpInstance.metadata()).width;
  const height = (await sharpInstance.metadata()).height;

  const svgImage = `
    <svg style="width: ${width}; height: ${height};" >
      <style>
      .title { fill: #fff; font-size: 70px; font-weight: bold;}
      </style>
      <text x="50%" y="50%" text-anchor="middle" class="title">${text}</text>
    </svg>
    `;
  const svgBuffer = Buffer.from(svgImage);

  await sharpInstance.composite([
    {
      input: svgBuffer,
      top: 0,
      left: 0,
    },
  ]);

  return sharpInstance;
}

export default addText;
