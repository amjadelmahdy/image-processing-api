import { AppError } from "../../models/AppError";
import { record, records } from "../../models/records";

const recordsClass = new records();

const req_id: number = Math.floor(100000 + Math.random() * 900000);

const row: record = {
  req_id: req_id,
  client: "1.1.1.1",
  req_content: '{ "Test": "Records Model" }',
  status: "Test",
  file_name: "github-mark",
  browser: "Jasmine Integration Testing",
  user_agent: "Jasmine",
};

describe("Records Model", () => {
  describe("Check Definitions", () => {
    it("Insert method should be defined", () => {
      expect(recordsClass.insert).toBeDefined();
    });

    it("Success method should be defined", () => {
      expect(recordsClass.success).toBeDefined();
    });

    it("Fail method should be defined", () => {
      expect(recordsClass.fail).toBeDefined();
    });
  });

  describe("Check Successfull Requests", () => {
    it("Should insert a row and return it with same req_id", async () => {
      const res = await recordsClass.insert(row);
      expect(res?.req_id).toBe(row.req_id);
    });

    it("Should update status to Failed and return the row", async () => {
      const res = await recordsClass.fail(
        req_id,
        "Test & status may be success",
      );
      expect(res).toEqual(
        jasmine.objectContaining({
          req_id: req_id,
        }),
      );
    });

    it("Should update status to Success and return the row", async () => {
      const res = await recordsClass.success(req_id);
      expect(res).toEqual(
        jasmine.objectContaining({
          req_id: req_id,
        }),
      );
    });
  });

  describe("Check Corrupted Requests", () => {
    it("Should rejects with an AppError message: Insert method failier!", async () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      await expectAsync(recordsClass.insert({})).toBeRejectedWithError(
        AppError,
        "Insert method failier!, check records table, did you run 'npx db-migrate up' command",
      );
    });

    it("Should rejects with an AppError message: Fail method failier!", async () => {
      await expectAsync(recordsClass.fail(NaN, "")).toBeRejectedWithError(
        AppError,
        "Fail method failier!, check records table, did you run 'npx db-migrate up' command",
      );
    });

    it("Should rejects with an AppError message: Success method failier!", async () => {
      await expectAsync(recordsClass.success(NaN)).toBeRejectedWithError(
        AppError,
        "Success method failier!, check records table, did you run 'npx db-migrate up' command",
      );
    });
  });
});
