import express from "express";
import passport from "passport";
import crypto from "crypto";
import myDB from "../db/myMongoDB.js";

const router = express.Router();

// router.post("/api/login/password",
//     passport.authenticate("local", {
//       successRedirect: "/",
//       failureRedirect: "/login",
//     })
// );

router.post("/api/login/password", async (req, res, next) => {
    try {
        passport.authenticate("local", (err, user, info) => {
            if (err) throw err;
            if (!user) return res.status(400).json({ ok: false, msg: "Login failed" });

            req.logIn(user, function(err) {
                if (err) throw err;
                return res.status(200).json({ ok: true, username: user.username });
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
            res.status(200).json({ username: null, msg: "Logged out", ok: true });
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
  
router.get("/api/getUser", async (req, res) => {
    try {
        console.log("getUser", req.user);
        res.status(200).json({ username: req.user?.username });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.post("/api/signup", async (req, res) => {
    try {
        const user = await myDB.getUserByUsername(req.body.username);
        if (user) {
            return res.status(400).json({ ok: false, msg: "Username already exists" });
        }

        var salt = crypto.randomBytes(16);
        crypto.pbkdf2(req.body.password, salt, 310000, 32, "sha256", async (err, hashedPassword) => {
            if (err) throw err;

            await myDB.insertUser({
                username: req.body.username,
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



// router.post("/api/signup", async function (req, res, next) {
//     console.log("**** signup", req.body);

//     const user = await myDB.getUserByUsername(req.body.username);
//     if (user) {
//         return res.status(400).json({ ok: false, msg: "Username already exists" });
//     }

//     var salt = crypto.randomBytes(16);
//     crypto.pbkdf2(
//         req.body.password,
//         salt,
//         310000,
//         32,
//         "sha256",
//         async function (err, hashedPassword) {
//         if (err) {
//             return next(err);
//         }

//         const insertResponse = await myDB.insertUser({
//             username: req.body.username,
//             hashedPassword: hashedPassword.toString("hex"),
//             salt: salt.toString("hex"),
//         });

//         console.log("inserted", insertResponse);

//         res.status(200).json({ ok: true, msg: "Signed up " });
//         }
//     );
// });

export default router;