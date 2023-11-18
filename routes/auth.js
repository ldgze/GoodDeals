import express from "express";
import passport from "passport";

const router = express.Router();

router.post(
    "api/login/password", 
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/login",
    })
);

router.get("/login", function(req, res){
    res.render("login");
});

export default router;