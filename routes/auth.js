import express from "express";
import passport from "passport";
import crypto from "crypto";
import myDB from "../db/myMongoDB.js";

const router = express.Router();

router.post("/api/login/password", async (req, res, next) => {
    try {
        passport.authenticate("local", (err, user, info) => {
            if (err) throw err;
            if (!user) return res.status(400).json({ ok: false, msg: "Login failed" });

            req.logIn(user, function(err) {
                if (err) throw err;
                return res.status(200).json({ ok: true, email: user.email, id: user.id});
            });
        })(req, res, next);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
  
router.post("/api/logout", async (req, res) => {
    try {
        req.logout(function (err) {
            if (err) throw err;
            res.status(200).json({ email: null, msg: "Logged out", ok: true });
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get("/api/getUser", async (req, res) => {
    console.log(11111111111111111111);
    try {
        if (req.isAuthenticated() && req.user) {
            console.log(2222222222222222222222);
            console.log(req.user);
            const userId = await myDB.getUserByEmail(req.user.email);
            console.log("this may be user id:", userId)
            console.log("this may be user id:", userId._id)
            res.status(200).json({id:userId._id,email:req.user.email, name:userId.username});
        } else {
            console.log(333333333333333333);
            res.status(401).json({ message: "User not authenticated" });
        }
    } catch (error) {
        console.log(44444444444444444444444444);
        res.status(500).json({ error: error.message });
    }
});

// router.get("/api/getUser", async (req, res) => {
//     try {
//         console.log("getUser", req.user);
//         res.status(200).json({ id: req.user?._id, email: req.user?.email, username: req.user?.username });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });
  
router.post("/api/signup", async (req, res) => {
    try {
        const user = await myDB.getUserByEmail(req.body.email);
        if (user) {
            return res.status(400).json({ ok: false, msg: "Email already exists" });
        }

        var salt = crypto.randomBytes(16);
        crypto.pbkdf2(req.body.password, salt, 310000, 32, "sha256", async (err, hashedPassword) => {
            if (err) throw err;

            await myDB.insertUser({
                username: req.body.username,
                email: req.body.email,
                hashedPassword: hashedPassword.toString("hex"),
                salt: salt.toString("hex"),
            });

            res.status(200).json({ ok: true, msg: "Signed up" });
        });
    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({ error: error.message });
    }
});

export default router;