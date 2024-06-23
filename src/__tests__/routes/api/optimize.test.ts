import request from "supertest";
import app from "../../../index";

// one for success validation
// one for passes validation

describe("Optimze Route", () => {
  describe("Check Successfull Requests", () => {
    it("Should return status 201 and return json", async () => {
      const res = await request(app)
        .post("/optimize")
        .set({ "user-agent": "supertest" })
        .set({ "sec-ch-ua": "ts-node" })
        .field("width", 1)
        .field("height", 2)
        .attach("file", "src/__tests__/test-image.jpg");

      expect(res.status).toBe(201);
      expect(res.headers["content-type"]).toMatch(/json/);
    });

    it("Should return batch_id of type number", async () => {
      const res = await request(app)
        .post("/optimize")
        .set({ "user-agent": "supertest" })
        .set({ "sec-ch-ua": "ts-node" })
        .field("width", 1)
        .field("height", 2)
        .attach("file", "src/__tests__/test-image.jpg");

      expect(res.body.batch_id).not.toBeNaN();
    });

    it("Should return json with image_name: test-image_w1_h2.jpg", async () => {
      const res = await request(app)
        .post("/optimize")
        .set({ "user-agent": "supertest" })
        .set({ "sec-ch-ua": "ts-node" })
        .field("width", 1)
        .field("height", 2)
        .attach("file", "src/__tests__/test-image.jpg");

      expect(res.body.details.img_name).toBe("test-image_w1_h2.jpg");
    });

    it("Should blur successfully", async () => {
      const res = await request(app)
        .post("/optimize")
        .set({ "user-agent": "supertest" })
        .set({ "sec-ch-ua": "ts-node" })
        .field("blur", 1)
        .attach("file", "src/__tests__/test-image.jpg");

      expect(res.body.details.img_name).toMatch(/b1/);
    });

    it("Should grayscale successfully", async () => {
      const res = await request(app)
        .post("/optimize")
        .set({ "user-agent": "supertest" })
        .set({ "sec-ch-ua": "ts-node" })
        .field("grayscale", "true")
        .attach("file", "src/__tests__/test-image.jpg");

      expect(res.body.details.img_name).toMatch(/grayscale/);
    });

    it("Should hue successflly", async () => {
      const res = await request(app)
        .post("/optimize")
        .set({ "user-agent": "supertest" })
        .set({ "sec-ch-ua": "ts-node" })
        .field("hue", 1)
        .attach("file", "src/__tests__/test-image.jpg");

      expect(res.body.details.img_name).toMatch(/h1/);
    });

    it("Should saturate successflly", async () => {
      const res = await request(app)
        .post("/optimize")
        .set({ "user-agent": "supertest" })
        .set({ "sec-ch-ua": "ts-node" })
        .field("saturation", 1)
        .attach("file", "src/__tests__/test-image.jpg");

      expect(res.body.details.img_name).toMatch(/s1/);
    });

    it("Should rotate successflly", async () => {
      const res = await request(app)
        .post("/optimize")
        .set({ "user-agent": "supertest" })
        .set({ "sec-ch-ua": "ts-node" })
        .field("rotate", 1)
        .attach("file", "src/__tests__/test-image.jpg");

      expect(res.body.details.img_name).toMatch(/d1/);
    });

    it("Should optimize successflly", async () => {
      const res = await request(app)
        .post("/optimize")
        .set({ "user-agent": "supertest" })
        .set({ "sec-ch-ua": "ts-node" })
        .field("format", "webp")
        .field("quality", 1)
        .attach("file", "src/__tests__/test-image.jpg");

      expect(res.body.details.img_name).toBe("test-image_q1.webp");
    });

    it("Should add text successflly", async () => {
      const res = await request(app)
        .post("/optimize")
        .set({ "user-agent": "supertest" })
        .set({ "sec-ch-ua": "ts-node" })
        .field("text", "Hello World!")
        .attach("file", "src/__tests__/test-image.jpg");

      expect(res.body.details.img_name).toMatch(/_T/);
    });

    it("Should tint successflly", async () => {
      const res = await request(app)
        .post("/optimize")
        .set({ "user-agent": "supertest" })
        .set({ "sec-ch-ua": "ts-node" })
        .field("red", 1)
        .field("green", 1)
        .field("blue", 0)
        .attach("file", "src/__tests__/test-image.jpg");

      expect(res.body.details.img_name).toBe("test-image_RGB(1-1-0).jpg");
    });
  });

  describe("Check Corrupted Requests", () => {
    /* Edge case will pass validation, and cought at process function */
    it("Should send Process Error: Original & final names are matching. Params must be missing!", async () => {
      const res = await request(app)
        .post("/optimize")
        .field("format", "png")
        .attach("file", "src/__tests__/github-mark.png");
      expect(res.body.error).toBe("Process Error");
      expect(res.body.message).toBe(
        "Original & final names are matching. Params must be missing!",
      );
    });

    it("Should send MulterError: Failed to upload the image, Check name attribute and enctype in the HTML doc!", async () => {
      const res = await request(app)
        .post("/optimize")
        .field("", "")
        .attach("file", "src/__tests__/github-mark.png");

      expect(res.body.error).toBe("MulterError");
      expect(res.body.message).toBe(
        "Failed to upload the image, Check name attribute and enctype in the HTML doc!",
      );
    });
    /* Edge case where file added in the request, but other input field: i.e width 
       does not have name attribute */
    it("Should send Validation Error: Missing a file to process!", async () => {
      const res = await request(app)
        .post("/optimize")
        .field("format", "jpeg")
        .attach("", "");

      expect(res.body.error).toBe("Validation Error");
      expect(res.body.message).toBe("Missing a file to process!");
    });

    it("Should send Validation Error: Request body is empty!", async () => {
      const res = await request(app)
        .post("/optimize")
        .attach("file", "src/__tests__/github-mark.png");

      expect(res.body.error).toBe("Validation Error");
      expect(res.body.message).toBe("Request body is empty!");
    });

    it("Should send Validation Error: Expected a number but got another type!", async () => {
      const res = await request(app)
        .post("/optimize")
        .field("rotate", "Not a number")
        .attach("file", "src/__tests__/github-mark.png");

      expect(res.body.error).toBe("Validation Error");
      expect(res.body.message).toBe("Expected a number but got another type!");
    });

    it("Should send Validation Error: Missing mandatory resize parameter for processing!", async () => {
      const res = await request(app)
        .post("/optimize")
        .field("width", 1)
        .attach("file", "src/__tests__/github-mark.png");

      expect(res.body.error).toBe("Validation Error");
      expect(res.body.message).toBe(
        "Missing mandatory resize parameter for processing!",
      );
    });

    it("Should send Validation Error: Width & Height must be a number from 1 to 5000!", async () => {
      const res = await request(app)
        .post("/optimize")
        .field("width", 1)
        .field("height", 7000)
        .attach("file", "src/__tests__/github-mark.png");

      expect(res.body.error).toBe("Validation Error");
      expect(res.body.message).toBe(
        "Width & Height must be a number from 1 to 5000!",
      );
    });

    it("Should send Validation Error: Quality parameter should be from 1 to 100!", async () => {
      const res = await request(app)
        .post("/optimize")
        .field("quality", 0)
        .attach("file", "src/__tests__/github-mark.png");

      expect(res.body.error).toBe("Validation Error");
      expect(res.body.message).toBe(
        "Quality parameter should be from 1 to 100!",
      );
    });

    it("Should send Validation Error: Format must be one from (png, jpeg, webp)!", async () => {
      const res = await request(app)
        .post("/optimize")
        .field("format", "gif")
        .attach("file", "src/__tests__/github-mark.png");

      expect(res.body.error).toBe("Validation Error");
      expect(res.body.message).toBe(
        "Format must be one from (png, jpeg, webp)!",
      );
    });

    it("Should send Validation Error: Rotate parameter should be from 1 to 360!", async () => {
      const res = await request(app)
        .post("/optimize")
        .field("rotate", 0)
        .attach("file", "src/__tests__/github-mark.png");

      expect(res.body.error).toBe("Validation Error");
      expect(res.body.message).toBe(
        "Rotate parameter should be from 1 to 360!",
      );
    });

    it("Should send Validation Error: Blur parameter should be from 1 to 1000!", async () => {
      const res = await request(app)
        .post("/optimize")
        .field("blur", 1001)
        .attach("file", "src/__tests__/github-mark.png");

      expect(res.body.error).toBe("Validation Error");
      expect(res.body.message).toBe("Blur parameter should be from 1 to 1000!");
    });

    it("Should send Validation Error: Hue & Saturation must be a number from 1 to 239!", async () => {
      const res = await request(app)
        .post("/optimize")
        .field("hue", 240)
        .attach("file", "src/__tests__/github-mark.png");

      expect(res.body.error).toBe("Validation Error");
      expect(res.body.message).toBe(
        "Hue & Saturation must be a number from 1 to 239!",
      );
    });

    it("Should send Validation Error: Hue & Saturation must be a number from 1 to 239!", async () => {
      const res = await request(app)
        .post("/optimize")
        .field("hue", 0)
        .attach("file", "src/__tests__/github-mark.png");

      expect(res.body.error).toBe("Validation Error");
      expect(res.body.message).toBe(
        "Hue & Saturation must be a number from 1 to 239!",
      );
    });

    it("Should send Validation Error: Tint parameters should be from 1 to 255!", async () => {
      const res = await request(app)
        .post("/optimize")
        .field("red", 256)
        .attach("file", "src/__tests__/github-mark.png");

      expect(res.body.error).toBe("Validation Error");
      expect(res.body.message).toBe("Tint parameters should be from 1 to 255!");
    });

    it("Should send Validation Error: Grayscale value is not set to true!", async () => {
      const res = await request(app)
        .post("/optimize")
        .field("grayscale", "not of type boolean")
        .attach("file", "src/__tests__/github-mark.png");

      expect(res.body.error).toBe("Validation Error");
      expect(res.body.message).toBe("Grayscale value is not set to true!");
    });

    it("Should send Validation Error: Text string should be 20 characters length maximum!", async () => {
      const res = await request(app)
        .post("/optimize")
        .field(
          "text",
          "This text is more than 20 characters length so should fail",
        )
        .attach("file", "src/__tests__/github-mark.png");

      expect(res.body.error).toBe("Validation Error");
      expect(res.body.message).toBe(
        "Text string should be 20 characters length maximum!",
      );
    });

    it("Should send Validation Error: Expected a number but got another type!", async () => {
      const res = await request(app)
        .post("/optimize")
        .field("width", "This is not a number")
        .field("height", 80)
        .attach("file", "src/__tests__/github-mark.png");
      expect(res.body.error).toBe("Validation Error");
      expect(res.body.message).toBe("Expected a number but got another type!");
    });

    it("Should send Validation Error: Expected a number but got another type!", async () => {
      const res = await request(app)
        .post("/optimize")
        .field("rotate", "This is not a number")
        .attach("file", "src/__tests__/github-mark.png");
      expect(res.body.error).toBe("Validation Error");
      expect(res.body.message).toBe("Expected a number but got another type!");
    });

    it("Should send Validation Error: Quality parameter should be from 1 to 100!", async () => {
      const res = await request(app)
        .post("/optimize")
        .field("quality", 500)
        .attach("file", "src/__tests__/github-mark.png");
      expect(res.body.error).toBe("Validation Error");
      expect(res.body.message).toBe(
        "Quality parameter should be from 1 to 100!",
      );
    });
  });
});
