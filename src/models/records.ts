import db from "../database";
import { AppError } from "./AppError";

export type record = {
  req_id: number;
  client: string;
  req_content: string;
  status: string;
  file_name: string | undefined;
  time_stamp?: string;
  browser: string | string[] | undefined;
  user_agent: string | undefined;
};

export class records {
  async insert(rcr: record): Promise<record> {
    const conn = await db.connect().catch(() => {
      throw new AppError("DB Error", 500, "Failed to establish DB connection!");
    });
    const sql =
      "INSERT INTO records (req_id, client, req_content, status, file_name, time_stamp, browser, user_agent) VALUES ($1, $2, $3, $4, $5, pg_catalog.clock_timestamp(), $6, $7) RETURNING *";
    const result = await conn
      .query(sql, [
        rcr.req_id,
        rcr.client,
        rcr.req_content,
        rcr.status,
        rcr.file_name,
        rcr.browser,
        rcr.user_agent,
      ])
      .catch(() => {
        throw new AppError(
          "DB Error",
          500,
          "Insert method failier!, check records table, did you run 'npx db-migrate up' command",
        );
      });
    conn.release();
    return result.rows[0];
  }

  async success(req_id: number): Promise<record> {
    const conn = await db.connect().catch(() => {
      throw new AppError("DB Error", 500, "Failed to establish DB connection!");
    });
    const sql =
      "UPDATE records SET status = 'Success' WHERE req_id = $1 RETURNING *";
    const result = await conn.query(sql, [req_id]).catch(() => {
      throw new AppError(
        "DB Error",
        500,
        "Success method failier!, check records table, did you run 'npx db-migrate up' command",
      );
    });
    conn.release();
    return result.rows[0];
  }

  async fail(req_id: number, error_reason: string): Promise<record> {
    const conn = await db.connect().catch(() => {
      throw new AppError("DB Error", 500, "Failed to establish DB connection!");
    });
    const sql =
      "UPDATE records SET status = 'Failed', error_reason = $2 WHERE req_id = $1 RETURNING *";
    const result = await conn.query(sql, [req_id, error_reason]).catch(() => {
      throw new AppError(
        "DB Error",
        500,
        "Fail method failier!, check records table, did you run 'npx db-migrate up' command",
      );
    });
    conn.release();
    return result.rows[0];
  }
}
