import request from "supertest";
import app from "../../../index";

describe("Image Route", () => {
  it("Should send status of 200", () => {
    request(app).get("/image/github-mark.png").expect(200);
  });

  it("Should send a ArrayBuffer", () => {
    request(app)
      .get("/image/github-mark.png")
      .expect("Content-Type", /arraybuffer/);
  });

  it("Should send AppError with message: Cannot GET undefined image name!", () => {
    request(app).get("/image/").expect(400);
    request(app).get("/image/").expect("Image Error");
    request(app).get("/image/").expect("Cannot GET undefined image name!");
  });
});
