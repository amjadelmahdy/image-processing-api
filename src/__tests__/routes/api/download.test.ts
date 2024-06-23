import request from "supertest";
import app from "../../../index";

describe("Download Route", () => {
  it("Should send status of 200", () => {
    request(app).get("/download/github-mark.png").expect(200);
  });

  it("Should send a ArrayBuffer", () => {
    request(app)
      .get("/download/github-mark.png")
      .expect("Content-Type", /arraybuffer/);
  });

  it("Should send AppError with message: Cannot GET undefined image name!", () => {
    request(app).get("/download/").expect(400);
    request(app).get("/download/").expect("Download Error");
    request(app).get("/download/").expect("Cannot GET undefined image name!");
  });
});
