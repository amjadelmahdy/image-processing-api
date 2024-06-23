import grayscale from "../../../util/sharp/grayscale";
import path from "path";
import sharp from "sharp";
import { AppError } from "../../../models/AppError";

const imgPath = path.join("src", "__tests__", "test-image.jpg");
const sharpInstance = sharp(imgPath);

describe("Grayscale Service", () => {
  it("Should be defined", () => {
    expect(grayscale).toBeDefined();
  });

  it("Should resolve a sharp instance", async () => {
    const res = await grayscale(sharpInstance, "true");
    expect(typeof res).toBe(typeof sharpInstance);
  });

  it("Should rejects with an AppError message: Missing mandatory grayscale parameter for processing!", async () => {
    await expectAsync(grayscale(sharpInstance, false)).toBeRejectedWithError(
      AppError,
      "Missing mandatory grayscale parameter for processing!",
    );
  });

  it("Should rejects with an AppError message: Grayscale value is not set to true!", async () => {
    await expectAsync(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      grayscale(sharpInstance, "This is not a boolean type"),
    ).toBeRejectedWithError(AppError, "Grayscale value is not set to true!");
  });
});
