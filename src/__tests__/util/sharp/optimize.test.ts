import optimize from "../../../util/sharp/optimize";
import path from "path";
import sharp from "sharp";
import { AppError } from "../../../models/AppError";

const imgPath = path.join("src", "__tests__", "test-image.jpg");
const gifPath = path.join("src", "__tests__", "github-mark.svg");
const sharpInstance = sharp(imgPath);
const gifInstance = sharp(gifPath);

describe("Optimize Service", () => {
  describe("Check Successfull Requests", () => {
    it("Should be defined", () => {
      expect(optimize).toBeDefined();
    });

    it("Should return a sharp instance", async () => {
      const res = await optimize(sharpInstance, NaN, NaN, 1, "");
      expect(typeof res).toBe(typeof sharpInstance);
    });

    it("Should resolve resize", async () => {
      await expectAsync(optimize(sharpInstance, 2, 4, NaN, "")).toBeResolved();
    });

    it("Should resolve convert", async () => {
      await expectAsync(
        optimize(sharpInstance, NaN, NaN, NaN, "webp"),
      ).toBeResolved();
    });

    it("Should resolve compress", async () => {
      await expectAsync(
        optimize(sharpInstance, NaN, NaN, 1, ""),
      ).toBeResolved();
    });
  });

  describe("Check Corrupted Requests", () => {
    it("Should rejects with an AppError message: Quality parameter should be from 1 to 100!", async () => {
      await expectAsync(
        optimize(sharpInstance, NaN, NaN, 300, ""),
      ).toBeRejectedWithError(
        AppError,
        "Quality parameter should be from 1 to 100!",
      );
    });

    it("Should rejects with an AppError message: Quality parameter should be from 1 to 100!", async () => {
      await expectAsync(
        optimize(sharpInstance, NaN, NaN, -4, ""),
      ).toBeRejectedWithError(
        AppError,
        "Quality parameter should be from 1 to 100!",
      );
    });

    it("Should rejects with an AppError message: Missing mandatory resize parameter for processing!", async () => {
      await expectAsync(
        optimize(sharpInstance, 1, NaN, NaN, ""),
      ).toBeRejectedWithError(
        AppError,
        "Missing mandatory resize parameter for processing!",
      );
    });

    it("Should rejects with an AppError message: Missing mandatory resize parameter for processing!", async () => {
      await expectAsync(
        optimize(sharpInstance, NaN, 1, NaN, ""),
      ).toBeRejectedWithError(
        AppError,
        "Missing mandatory resize parameter for processing!",
      );
    });

    it("Should rejects with an AppError message: Format must be one from (png, jpeg, webp)!", async () => {
      await expectAsync(
        optimize(sharpInstance, NaN, NaN, NaN, "gif"),
      ).toBeRejectedWithError(
        AppError,
        "Format must be one from (png, jpeg, webp)!",
      );
    });

    it("Should rejects with an AppError message: File format is not supported!", async () => {
      await expectAsync(
        optimize(gifInstance, NaN, NaN, NaN, ""),
      ).toBeRejectedWithError(AppError, "File format is not supported!");
    });

    it("Should rejects with an AppError message: Expected a number but got another type!", async () => {
      await expectAsync(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        optimize(sharpInstance, NaN, NaN, "This is not a number", ""),
      ).toBeRejectedWithError(
        AppError,
        "Expected a number but got another type!",
      );
    });

    it("Should rejects with an AppError message: Expected a number but got another type!", async () => {
      await expectAsync(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        optimize(sharpInstance, NaN, "This is not a number", NaN, ""),
      ).toBeRejectedWithError(
        AppError,
        "Expected a number but got another type!",
      );
    });

    it("Should rejects with an AppError message: Expected a number but got another type!", async () => {
      await expectAsync(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        optimize(sharpInstance, "This is not a number", NaN, NaN, ""),
      ).toBeRejectedWithError(
        AppError,
        "Expected a number but got another type!",
      );
    });
  });
});
