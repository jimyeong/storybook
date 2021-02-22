const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const mongoose = require("mongoose");
const passport = require("passport");
require("./models/User");
require("./models/Story"); //Schema hasn't been registered for model "story". 호출 하지 않을경우
require("./config/passport")(passport);
const keys = require("./config/keys");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const path = require("path");
const { truncate, stripTags, formatDate, select} = require("./helpers/hbs");

// handlebars
const _handlebars = require("handlebars");
const {allowInsecurePrototypeAccess} = require("@handlebars/allow-prototype-access");
const exphbs = require("express-handlebars");
let hbs = exphbs.create({
    handlebars : allowInsecurePrototypeAccess(_handlebars),
    helpers: {
        truncate: truncate,
        stripTags:stripTags,
        formatDate: formatDate,
        select:select
    }
});

app.set("view engine", "handlebars");
app.engine("handlebars", hbs.engine);

// body parser set up
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// method overrides
app.use(methodOverride("_method"));

// public folder set up
app.use(express.static(path.join(__dirname, "public")));
const oauth = require("./routes/oauth");
const index = require("./routes/index");
// const dashboard = require("./routes/dashboard");
const stories = require("./routes/stories");

//set global var
// 넥스트 함수 쓰면 어떻게 되는 거지..

app.use((req, res, next)=>{
    // use를 어디서나 쓰고 싶기 때문에
    res.locals.user = req.user||null;
    next();
})

// mongoose connect
mongoose.connect(keys.mongoURL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log("mongo is connected");
}).catch(err => console.log("error: " + err));

// session
// router 보다 먼저 셋팅해야 한다.
app.use(cookieParser());
app.use(session({
    secret: "jimmy",
    resave: false,
    saveUninitialized: false,
    cookie: {
        // 2시간
        maxAge: 1000 * 3600 * 2
    }
}));

// passportmiddleware
app.use(passport.initialize());
app.use(passport.session());

app.use("/", index);
app.use("/oauth", oauth);
// app.use("/dashboard", dashboard);
app.use("/stories", stories);

app.listen(port , ()=>{
    console.log(`the server is running on ${port}`);
});
