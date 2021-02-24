const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const {ensureAuthenticated, ensureGuest} = require("../helpers/auth");
const Story = mongoose.model("story");


// index
router.get("/", ensureGuest,(req, res)=>{
    let state ={}

    state.user = req.user;
    res.render("index/welcome", state);
});

// dashboard
router.get("/dashboard", ensureAuthenticated,(req, res)=>{
    Story.find({user: req.user.id})
        .then(story=>{

            res.render("index/dashboard", {
                user: req.user,
                story: story
            });
        }).catch(err=>{
            res.render("error/index", err)
    })
});

// about
router.get("/about", (req, res)=>{
    let state ={}
    state.user = req.user;
    //console.log(`user: ${req.user}`);
    res.render("index/about", state);

});


module.exports = router;


