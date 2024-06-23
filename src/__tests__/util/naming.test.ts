import { RequestContent } from "../../models/RequestContent";
import naming from "../../util/naming";

const fn = "github-mark";
const r: RequestContent = {
  img_name: "",
  format: "jpeg",
  width: 1200,
  height: 1400,
  quality: 90,
  original_size: NaN,
  rotate: 180,
  blur: 20,
  hue: 150,
  saturation: 140,
  grayscale: true,
  red: 255,
  green: 200,
  blue: 190,
  text: "T",
};

describe("Naming function", () => {
  it("Should return typeof string", () => {
    const name = naming(fn, r);
    expect(typeof name).toBe("string");
  });

  it("Should return a string: github-mark_w1200_h1400_q90_d180_b20_RGB(255-200-190)_grayscale_h150_s140_T", () => {
    expect(naming(fn, r)).toEqual(
      "github-mark_w1200_h1400_q90_d180_b20_RGB(255-200-190)_grayscale_h150_s140_T",
    );
  });
});
