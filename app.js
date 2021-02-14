const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
require("./models/User");
require("./config/passport")(passport);
const oauth = require("./routes/oauth");
const keys = require("./config/keys");
const session = require("express-session");
const cookieParser = require("cookie-parser");

const app = express();
const port = process.env.PORT || 5000;

// mongoose connect
mongoose.connect(keys.mongoURL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log("mongo is connected");
}).catch(err => console.log("error: " + err));

// session
app.use(cookieParser());
app.use(session({
    secret: "jimmy",
    resave: false,
    saveUninitialized: false
}));

// passportmiddleware
app.use(passport.initialize());
app.use(passport.session());


app.get("/", (req, res)=>{
    res.send("it works")
});

app.use("/oauth", oauth);

app.listen(port , ()=>{
    console.log(`the server is running on ${port}`);
});
