import express from "express";
import path, { dirname } from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import { fileURLToPath } from "url";
import myDB from "./db/myMongoDB.js";

import passport from "passport";
import LocalStrategy from "passport-local";
import crypto from "crypto";

import indexRouter from "./routes/index.js";
import authRouter from "./routes/auth.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

const myStrategy = new LocalStrategy(
  function verify(username, password, cb){
    // User found and authenticated
    cb(
      null,
      {id: 1, username: username },
      {message: "Hello"}
    );

  }
);

passport.use(myStrategy);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "front", "dist")));

app.use("/", indexRouter);
app.use("/", authRouter);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "front/dist", "index.html"));
});

myDB.connect();
export default app;
