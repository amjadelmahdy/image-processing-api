import db from "../database";

describe("DB Client", () => {
  it("Should Connect Successfully", async () => {
    const conn = await db.connect();
    expect(conn).toEqual(
      jasmine.objectContaining({
        _connected: true,
      }),
    );
    conn.release();
  });
});
