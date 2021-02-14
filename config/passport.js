const GoogleStretegy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const keys = require("./keys");
const User = mongoose.model("user");


module.exports = function (passport) {
    passport.use(new GoogleStretegy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: "/oauth/google/callback",
        proxy: true // https, error not gonna trrow
    }, (accessToken, refreshToken, profile, done) => {
        // console.log(accessToken);
        // console.log(profile);
        const image = profile.photos[0].value
        console.log(image);
        const newUser = {
            googleID: profile.id,
            firstname: profile.name.givenName,
            familyname: profile.name.familyname,
            email: profile.emails[0].value,
            image: image
        }

        // check for existing user
        User.findOne({
            googleID: profile.id
        }).then(user => {
            if (user) {
                done(null, user);
            } else {
                // create newUser
                new User(newUser)
                    .save()
                    .then(user => done(null, user))
            }
        })

    }))
    passport.serializeUser((user, done)=>{
        done(null, user.id);
    })

    passport.deserializeUser((id, done)=>{
        User.findById(id).then(user=>done(null, user));
    })
}

