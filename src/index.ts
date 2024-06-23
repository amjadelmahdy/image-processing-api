import express, { Application } from "express";
import routes from "./routes/routes";
import { errorHandler } from "./handlers/ErrorHandler";
import db from "./database";
import winLog from "./config/WinstongConfig";

// Creating instance of an applicatoin using express
const app: Application = express();
const port = process.env.PORT || 3000;

// Express body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Using express router object
app.use("/", routes);

// Error handling
app.use(errorHandler);

app.listen(port, async () => {
  console.log(`Server started at http://localhost:${port}`);
  try {
    const conn = await db.connect();
    console.log("Connected to DB...");

    conn.release();
  } catch (error) {
    await winLog.error("DB Connection Failer!\n\n", error);
    console.log("\n\nDB Connection Failer!\n\n", error);
  }
});

export default app!;
