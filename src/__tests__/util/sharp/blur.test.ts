import blur from "../../../util/sharp/blur";
import path from "path";
import sharp from "sharp";
import { AppError } from "../../../models/AppError";

const imgPath = path.join("src", "__tests__", "test-image.jpg");
const sharpInstance = sharp(imgPath);

describe("Blur Service", () => {
  it("Should be defined", () => {
    expect(blur).toBeDefined();
  });

  it("Should resolve a sharp instance", async () => {
    const res = await blur(sharpInstance, 1);
    expect(typeof res).toBe(typeof sharpInstance);
  });

  it("Should rejects with an AppError message: Missing mandatory blur parameter for processing!", async () => {
    await expectAsync(blur(sharpInstance, NaN)).toBeRejectedWithError(
      AppError,
      "Missing mandatory blur parameter for processing!",
    );
  });

  it("Should rejects with an AppError message: Blur parameter should be from 1 to 1000!", async () => {
    await expectAsync(blur(sharpInstance, 3000)).toBeRejectedWithError(
      AppError,
      "Blur parameter should be from 1 to 1000!",
    );
  });

  it("Should rejects with an AppError message: Blur parameter should be from 1 to 1000!", async () => {
    await expectAsync(blur(sharpInstance, -3)).toBeRejectedWithError(
      AppError,
      "Blur parameter should be from 1 to 1000!",
    );
  });

  it("Should rejects with an AppError message: Expected a number but got another type!", async () => {
    await expectAsync(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      blur(sharpInstance, "This is not a number"),
    ).toBeRejectedWithError(
      AppError,
      "Expected a number but got another type!",
    );
  });
});
