import { NextFunction, Request, Response } from "express";
import { AppError } from "../models/AppError";
import { records } from "../models/records";

const validate = (req: Request, res: Response, next: NextFunction) => {
  const {
    width,
    height,
    format,
    quality,
    rotate,
    blur,
    hue,
    saturation,
    grayscale,
    text,
    red,
    green,
    blue,
  } = req.body;

  const values: number[] = [
    width,
    height,
    quality,
    rotate,
    blur,
    hue,
    saturation,
    red,
    green,
    blue,
  ];

  const recordsClass = new records();

  try {
    // check if file and body exits

    if (!req.file || !req.body) {
      if (!req.body) {
        throw new AppError("Validation Error", 400, "Missing request body!");
      }
      throw new AppError("Validation Error", 400, "Missing a file to process!");
    }

    // Check if all processing parameters are missing
    if (
      !format &&
      !width &&
      !height &&
      !quality &&
      !rotate &&
      !blur &&
      !grayscale &&
      !hue &&
      !saturation &&
      !text &&
      !red &&
      !green &&
      !blue
    ) {
      throw new AppError("Validation Error", 400, "Request body is empty!");
    }

    // Check if values are numbers
    values.forEach((value) => {
      if (!value) return;
      if (isNaN(value)) {
        throw new AppError(
          "Validation Error",
          400,
          "Expected a number but got another type!",
        );
      }
    });

    // Check if got width and height missing, or vice versa
    if ((isNaN(width) || isNaN(height)) && !(isNaN(width) && isNaN(height))) {
      throw new AppError(
        "Validation Error",
        400,
        "Missing mandatory resize parameter for processing!",
      );
    }

    // check if width or height is between 1 and 5000
    if (width && height) {
      if (1 > width || 5000 < width || 1 > height || 5000 < height) {
        throw new AppError(
          "Validation Error",
          400,
          "Width & Height must be a number from 1 to 5000!",
        );
      }
    }

    // Check quality value is between 1 and 100
    if (quality) {
      if (quality < 1 || quality > 100) {
        throw new AppError(
          "Validation Error",
          400,
          "Quality parameter should be from 1 to 100!",
        );
      }
    }

    // check that format in (png, jpeg, webp)
    if (format) {
      if (!(format === "png" || format === "jpeg" || format === "webp")) {
        throw new AppError(
          "Validation Error",
          400,
          "Format must be one from (png, jpeg, webp)!",
        );
      }
    }

    // check that rotate value is between 1 and 360 degrees
    if (rotate) {
      if (1 > rotate || 360 < rotate) {
        throw new AppError(
          "Validation Error",
          400,
          "Rotate parameter should be from 1 to 360!",
        );
      }
    }

    // check blur value is between 1 and 1000
    if (blur) {
      if (1 > blur || 1000 < blur) {
        throw new AppError(
          "Validation Error",
          400,
          "Blur parameter should be from 1 to 1000!",
        );
      }
    }

    // check hue & saturation values are between 1 and 239
    if (hue || saturation) {
      if (1 > hue || 239 < hue || 1 > saturation || 239 < saturation) {
        throw new AppError(
          "Validation Error",
          400,
          "Hue & Saturation must be a number from 1 to 239!",
        );
      }
    }

    // check RGB values start from 0 to 255
    if (red || green || blue) {
      if (
        0 > red ||
        255 < red ||
        0 > green ||
        255 < green ||
        0 > blue ||
        255 < blue
      ) {
        throw new AppError(
          "Validation Error",
          400,
          "Tint parameters should be from 1 to 255!",
        );
      }
    }

    // check if grayscale is true
    if (grayscale) {
      if (grayscale != "true") {
        throw new AppError(
          "Validation Error",
          400,
          "Grayscale value is not set to true!",
        );
      }
    }

    // check text length does not exceed 20 characters
    if (text) {
      if (20 < text.length) {
        throw new AppError(
          "Validation Error",
          400,
          "Text string should be 20 characters length maximum!",
        );
      }
    }

    next();
  } catch (error) {
    recordsClass.fail(req.body.req_id, (error as Error).message);
    return next(error);
  }
};

export default validate;
