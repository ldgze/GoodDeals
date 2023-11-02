import express from "express";
import myDB from "./database/db.js";
import path, { dirname } from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import { fileURLToPath } from "url";
import indexRouter from "./routes/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 3000;

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "frontend", "dist")));
app.use("/", indexRouter);


const startServer = async () => {
  await myDB.connect();
  app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
  });
};

startServer();

export default app;