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
const { truncate, stripTags, formatDate, select, editIcon,stringify} = require("./helpers/hbs");

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
        select:select,
        editIcon: editIcon,
        stringify :stringify
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
    // 세션은 있는데, 여기선 찍히지 않는다.
    // res.locals.user = req.user||null;
    // 왜 여기서는 req.user 가 null 이 나오는 거지???
    // res.user = req.user || null;
    // console.log("hi, would it be excuted over and over?");
    // null 이다 이게 나올거라고 예상했었나보다.
    // console.log(req.user);
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
        // 실제로 작동한다. expiration date 이걸로 컨트롤 하는 거임
        // 얘가 수정되서, 다시 구동해서 로그인이 풀리는 건가
        // 서버가 다시시작되니까,,?
        maxAge: 1000*60*60 // 안된다고 생각했던건, req.user 객체를 내가 제대로 못넘기고 있었던 것 같다.
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
