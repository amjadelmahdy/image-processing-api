import tint from "../../../util/sharp/tint";
import path from "path";
import sharp from "sharp";
import { AppError } from "../../../models/AppError";

const imgPath = path.join("src", "__tests__", "test-image.jpg");
const sharpInstance = sharp(imgPath);

describe("Tint Service", () => {
  it("Should be defined", () => {
    expect(tint).toBeDefined();
  });

  it("Should resolve a sharp instance", async () => {
    await expectAsync(tint(sharpInstance, 0, 0, 1)).toBeResolved();
  });

  it("Should rejects with an AppError message: Missing mandatory tint parameter for processing!", async () => {
    await expectAsync(tint(sharpInstance, 0, 0, 0)).toBeRejectedWithError(
      AppError,
      "Missing mandatory tint parameter for processing!",
    );
  });

  it("Should rejects with an AppError message: Tint parameters should be from 1 to 255!", async () => {
    await expectAsync(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      tint(sharpInstance, 1, 1, 1000),
    ).toBeRejectedWithError(
      AppError,
      "Tint parameters should be from 1 to 255!",
    );
  });

  it("Should rejects with an AppError message: Tint parameters should be from 1 to 255!", async () => {
    await expectAsync(tint(sharpInstance, 1, -1, 1)).toBeRejectedWithError(
      AppError,
      "Tint parameters should be from 1 to 255!",
    );
  });

  it("Should rejects with an AppError message: Tint parameters should be from 0 to 255!", async () => {
    await expectAsync(tint(sharpInstance, 1000, 0, 1)).toBeRejectedWithError(
      AppError,
      "Tint parameters should be from 1 to 255!",
    );
  });

  it("Should rejects with an AppError message: Expected a number but got another type!", async () => {
    await expectAsync(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      tint(sharpInstance, "This is not a number", NaN, NaN),
    ).toBeRejectedWithError(
      AppError,
      "Expected a number but got another type!",
    );
  });

  it("Should rejects with an AppError message: Expected a number but got another type!", async () => {
    await expectAsync(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      tint(sharpInstance, NaN, "This is not a number", NaN),
    ).toBeRejectedWithError(
      AppError,
      "Expected a number but got another type!",
    );
  });

  it("Should rejects with an AppError message: Expected a number but got another type!", async () => {
    await expectAsync(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      tint(sharpInstance, NaN, NaN, "This is not a number"),
    ).toBeRejectedWithError(
      AppError,
      "Expected a number but got another type!",
    );
  });
});
