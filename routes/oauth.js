const express = require("express");
const router = express.Router();
const passport = require("passport");

//Missing required parameter: redirect_uri


router.get("/google", passport.authenticate("google", {
    scope: ['profile', 'email']
}))

router.get("/google/callback", passport.authenticate("google", {
        failureRedirect: "/login"
    }), (req, res) => {
        // when it's successful
        res.redirect("/dashboard");

    }
)


module.exports = router;

