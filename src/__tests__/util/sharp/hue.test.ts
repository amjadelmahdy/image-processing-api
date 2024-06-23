import hue from "../../../util/sharp/hue";
import path from "path";
import sharp from "sharp";
import { AppError } from "../../../models/AppError";

const imgPath = path.join("src", "__tests__", "test-image.jpg");
const sharpInstance = sharp(imgPath);

describe("Hue Service", () => {
  it("Should be defined", () => {
    expect(hue).toBeDefined();
  });

  it("Should resolve a sharp instance", async () => {
    const res = await hue(sharpInstance, 1);
    expect(typeof res).toBe(typeof sharpInstance);
  });

  it("Should rejects with an AppError message: Missing mandatory Hue parameter for processing!", async () => {
    await expectAsync(hue(sharpInstance, NaN)).toBeRejectedWithError(
      AppError,
      "Missing mandatory Hue parameter for processing!",
    );
  });

  it("Should rejects with an AppError message: Hue parameter should be from 1 to 239!", async () => {
    await expectAsync(hue(sharpInstance, 3000)).toBeRejectedWithError(
      AppError,
      "Hue parameter should be from 1 to 239!",
    );
  });

  it("Should rejects with an AppError message: Hue parameter should be from 1 to 239!", async () => {
    await expectAsync(hue(sharpInstance, -2)).toBeRejectedWithError(
      AppError,
      "Hue parameter should be from 1 to 239!",
    );
  });

  it("Should rejects with an AppError message: Expected a number but got another type!", async () => {
    await expectAsync(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      hue(sharpInstance, "This is not a number"),
    ).toBeRejectedWithError(
      AppError,
      "Expected a number but got another type!",
    );
  });
});
