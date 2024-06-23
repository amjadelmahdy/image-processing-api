import addText from "../../../util/sharp/text";
import path from "path";
import sharp from "sharp";
import { AppError } from "../../../models/AppError";

const imgPath = path.join("src", "__tests__", "test-image.jpg");
const sharpInstance = sharp(imgPath);

describe("Text Service", () => {
  it("Should be defined", () => {
    expect(addText).toBeDefined();
  });

  it("Should resolve a sharp instance", async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const res = await addText(sharpInstance, "2024");
    expect(typeof res).toBe(typeof sharpInstance);
  });

  it("Should rejects with an AppError message: Missing mandatory text parameter for processing!", async () => {
    await expectAsync(addText(sharpInstance, "")).toBeRejectedWithError(
      AppError,
      "Missing mandatory text parameter for processing!",
    );
  });

  it("Should rejects with an AppError message: Text string should be 20 characters length maximum!", async () => {
    await expectAsync(
      addText(
        sharpInstance,
        "This text should acceed the limit of 20 characters length and should reject with AppError",
      ),
    ).toBeRejectedWithError(
      AppError,
      "Text string should be 20 characters length maximum!",
    );
  });

  it("Should rejects with an AppError message: Expected a string but got another type!", async () => {
    await expectAsync(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      addText(sharpInstance, 1234),
    ).toBeRejectedWithError(
      AppError,
      "Expected a string but got another type!",
    );
  });
});
