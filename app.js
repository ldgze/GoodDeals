import express from "express";
import path, { dirname } from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import { fileURLToPath } from "url";
import myDB from "./db/myMongoDB.js";
import passport from "passport";
import LocalStrategy from "passport-local";
import session from "express-session";
import crypto from "crypto";
import dotenv from "dotenv";

import indexRouter from "./routes/index.js";
import authRouter from "./routes/auth.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

const myStrategy = new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
  },
  async function verify(email, password, cb) {
  try {
    const user = await myDB.getUserByEmail(email);

    if (!user) {
      return cb(null, false, { message: "Incorrect email or password" });
    }

    crypto.pbkdf2(password, Buffer.from(user.salt, "hex"), 310000, 32, "sha256", function (err, hashedPassword) {
      if (err) {
        return cb(err);
      }

      if (!crypto.timingSafeEqual(Buffer.from(user.hashedPassword, "hex"), hashedPassword)) {
        return cb(null, false, { message: "Incorrect email or password" });
      }
      cb(null, { id: user.id, email: email }); 
    });
  } catch (err) {
    cb(err);
  }
});

passport.use(myStrategy);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "front", "dist")));

app.set("trust proxy", 1);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    cb(null, { id: user.id, email: user.email });
  });
});

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});

app.use(passport.initialize());
app.use(passport.session());


app.use("/", indexRouter);
app.use("/", authRouter);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "front/dist", "index.html"));
});

myDB.connect();
export default app;
