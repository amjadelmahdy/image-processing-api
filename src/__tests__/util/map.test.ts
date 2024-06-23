import sharp from "sharp";
import { RequestContent } from "../../models/RequestContent";
import map from "../../util/map";
import { AppError } from "../../models/AppError";
import path from "path";

const imgPath = path.join("src", "__tests__", "test-image.jpg");
const sharpInstance = sharp(imgPath);
const r: RequestContent = {
  img_name: "",
  format: "",
  width: 20,
  height: 40,
  quality: NaN,
  original_size: NaN,
  rotate: NaN,
  blur: NaN,
  hue: NaN,
  saturation: NaN,
  grayscale: false,
  red: NaN,
  green: NaN,
  blue: NaN,
  text: "",
};

describe("Mapping Suite", () => {
  it("Should be defined", () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(map(sharpInstance, {})).toBeDefined();
  });

  it("Should resolve a sharpInstance", async () => {
    const res = await map(sharpInstance, r);
    expect(typeof res).toEqual(typeof sharpInstance);
  });

  it("Should rejects with an AppError message: Text string should be 20 characters length maximum!", async () => {
    await expectAsync(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      map(sharpInstance, {
        text: "Testing that this function will reject since it does not accept more than 20 characters at text property",
      }),
    ).toBeRejectedWithError(
      AppError,
      "Text string should be 20 characters length maximum!",
    );
  });
});
