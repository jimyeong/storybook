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

// 서버 다시하면 log out 된다.
// 서버가 다시켜져도 세션이 남아 있으면, 로그인 되이었야야 하는 거 아닌가
router.get("/verify", (req, res)=>{
    if(req.user){
        console.log(req.user);
    }else{
        console.log("Not Auth");
    }
})
router.get("/logout", (req,res)=>{
    req.logout();
    res.redirect("/");
})

module.exports = router;

