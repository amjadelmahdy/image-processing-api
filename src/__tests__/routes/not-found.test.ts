import request from "supertest";
import app from "../../index";

describe("Not Found Route", () => {
  it("Should send status of 404", () => {
    request(app).get("/notFound").expect(404);
  });

  it("Should send normal Error with message: Undefined route!", () => {
    request(app).post("/notFound").expect("Unsupported route!");
  });
});
