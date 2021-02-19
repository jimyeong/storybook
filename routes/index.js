const express = require("express");
const router = express.Router();



router.get("/", (req, res)=>{
    let state ={}
    state.user = req.user;
    //console.log(`user: ${req.user}`);
    res.render("welcome", state);

});

module.exports = router;


