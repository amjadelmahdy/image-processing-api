import rotate from "../../../util/sharp/rotate";
import path from "path";
import sharp from "sharp";
import { AppError } from "../../../models/AppError";

const imgPath = path.join("src", "__tests__", "test-image.jpg");
const sharpInstance = sharp(imgPath);

describe("Rotate Service", () => {
  it("Sould be defined", () => {
    expect(rotate).toBeDefined();
  });

  it("Should resolve a sharp instance", async () => {
    const res = await rotate(sharpInstance, 1);
    expect(typeof res).toBe(typeof sharpInstance);
  });

  it("Should rejects with an AppError message: Missing mandatory rotate parameter for processing!", async () => {
    await expectAsync(rotate(sharpInstance, NaN)).toBeRejectedWithError(
      AppError,
      "Missing mandatory rotate parameter for processing!",
    );
  });

  it("Should rejects with an AppError message: Rotate parameter should be from 1 to 360!", async () => {
    await expectAsync(rotate(sharpInstance, 500)).toBeRejectedWithError(
      AppError,
      "Rotate parameter should be from 1 to 360!",
    );
  });

  it("Should rejects with an AppError message: Rotate parameter should be from 1 to 360!", async () => {
    await expectAsync(rotate(sharpInstance, -500)).toBeRejectedWithError(
      AppError,
      "Rotate parameter should be from 1 to 360!",
    );
  });

  it("Should rejects with an AppError message: Expected a number but got another type!", async () => {
    await expectAsync(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      rotate(sharpInstance, "This is not a number"),
    ).toBeRejectedWithError(
      AppError,
      "Expected a number but got another type!",
    );
  });
});
