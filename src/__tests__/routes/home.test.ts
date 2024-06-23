import request from "supertest";
import app from "../../index";

describe("Home Route", () => {
  it("Should send status of 200", () => {
    request(app).get("/").expect(200);
  });

  it("Should send an HTML file", () => {
    request(app).get("/").expect("Content-Type", /html/);
  });
});
