import saturation from "../../../util/sharp/saturation";
import path from "path";
import sharp from "sharp";
import { AppError } from "../../../models/AppError";

const imgPath = path.join("src", "__tests__", "test-image.jpg");
const sharpInstance = sharp(imgPath);

describe("Saturation Service", () => {
  it("Should be defined", () => {
    expect(saturation).toBeDefined();
  });

  it("Should resolve a sharp instance", async () => {
    const res = await saturation(sharpInstance, 1);
    expect(typeof res).toBe(typeof sharpInstance);
  });

  it("Should rejects with an AppError message: Missing mandatory saturation parameter for processing!", async () => {
    await expectAsync(saturation(sharpInstance, 0)).toBeRejectedWithError(
      AppError,
      "Missing mandatory saturation parameter for processing!",
    );
  });

  it("Should rejects with an AppError message: Saturation parameter should be from 1 to 239!", async () => {
    await expectAsync(saturation(sharpInstance, 3000)).toBeRejectedWithError(
      AppError,
      "Saturation parameter should be from 1 to 239!",
    );
  });

  it("Should rejects with an AppError message: Saturation parameter should be from 1 to 239!", async () => {
    await expectAsync(saturation(sharpInstance, -2)).toBeRejectedWithError(
      AppError,
      "Saturation parameter should be from 1 to 239!",
    );
  });

  it("Should rejects with an AppError message: Expected a number but got another type!", async () => {
    await expectAsync(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      saturation(sharpInstance, "This is not a number"),
    ).toBeRejectedWithError(
      AppError,
      "Expected a number but got another type!",
    );
  });
});
