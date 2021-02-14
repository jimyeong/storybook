const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
require("./config/passport")(passport);
const oauth = require("./routes/oauth");

const app = express();
const port = process.env.PORT || 5000;



app.get("/", (req, res)=>{
    res.send("it works")
});

app.use("/oauth", oauth);

app.listen(port , ()=>{
    console.log(`the server is running on ${port}`);
});
