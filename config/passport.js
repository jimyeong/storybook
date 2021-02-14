const GoogleStretegy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const keys = require("./keys");

module.exports = function (passport){
    passport.use(new GoogleStretegy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: "/oauth/google/callback",
        proxy: true // https, error not gonna trrow
    },  (accessToken , refreshToken, profile, done)=>{
        console.log(accessToken);
        console.log(profile);
    }))

}

