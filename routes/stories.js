const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const {ensureAuthenticated, ensureGuest} = require("../helpers/auth");
const User = mongoose.model("user");
const Story = mongoose.model("story");

// index stories
// populate method 뭐지?
// join like lookup aggregation
router.get("/",(req, res)=>{

    // req, res 사이클 동안, 전역으로 사용할 수 있는, 변수다
    res.locals.user = req.user
    Story.find({status: "public"})
        .populate("user")
        .sort({date: "desc"}) // sorting
        .then(story=>{
        res.render("stories/index",{
            story:story
        });
    })
});

// add stories
router.get("/add", ensureAuthenticated,(req, res)=>{
    res.render("stories/add");
});

// edit story
router.get("/edit/:id", ensureAuthenticated,(req, res) => {
    Story.findOne({_id: req.params.id})
        .then(story =>{
            if(story.user != req.user.id){
                res.redirect("/stories")
            }else{
                res.render("stories/edit", {
                    story
                })
            }
        })
})


// logged in user story
router.get("/my/", ensureAuthenticated, (req, res)=>{
    res.locals.user = req.user;
    Story.find({user: req.user.id})
        .populate("user")
        .then(stories=>{
            res.render("stories/index", {
                story: stories
            })
        })
})


// user check 할 필요 없다.
router.get("/user/:userId", (req, res)=>{
    res.locals.user = req.user;
    Story.find({user: req.params.userId, status: "public"})
        .populate("user")
        .then(stories=>{
            res.render("stories/index", {
                story: stories
            })
    })
})

// show single story
// user check 할 필요 없다.
router.get("/show/:id", (req, res) =>{

    // req, res 사이클 동안, 전역으로 사용할 수 있는, 변수다
    res.locals.user = req.user
    Story.findOne({_id: req.params.id})
        .populate("user")
        .populate("comments.commentUser")
        .then(story =>{
            if(story.status == "public"){
                res.render("stories/show", {
                    story: story,
                })
            }else{
                if(req.user){

                    // 로그인한 유저와 스토리를 작성한 유저가 같은경우
                    if(req.user.id == story.user._id){
                        res.render("stories/show", {
                            story: story,
                        })
                    }else{
                        res.redirect("/stories");
                    }
                }else{
                    res.redirect("/stories");
                }

            }
        })
})
router.post("/", ensureAuthenticated,(req,res)=>{
    let allowComments;
    if(req.body.allowComments){
        allowComments = true;
    }else {
        allowComments = false;
    }

    const newStory = {
        title :req.body.title,
        body: req.body.body,
        status: req.body.status,
        allowComments: allowComments,
        user: req.user.id
    }

    new Story(newStory).save().then(story=>{
        res.redirect(`/stories/show/${story.id}`);
    });
})


// add stories
router.put("/:id", ensureAuthenticated,(req, res)=>{
    Story.findOne({_id: req.params.id})
        .then(story =>{
            let allowComments;
            if(req.body.allowComments){
                allowComments = true;
            }else {
                allowComments = false;
            }
            story.title = req.body.title;
            story.body = req.body.body;
            story.status = req.body.status;
            story.allowComments = allowComments;
            story.save().then(story=>{
                res.redirect("/dashboard");
            })
        })
});

router.delete("/:id",ensureAuthenticated ,(req, res)=>{
    Story.remove({_id:req.params.id}).then(()=>{
        res.redirect("/dashboard");
    })
});

router.post("/comment/:id",ensureAuthenticated ,(req, res)=>{
    Story.findOne({_id:req.params.id}).then(story=>{
        const newComment = {
            commentBody : req.body.commentBody,
            commentUser : req.user.id
        }

        story.comments.unshift(newComment);
        story.save().then(story=>{
            res.redirect(`/stories/show/${story.id}`);
        })

    })
})

module.exports = router;