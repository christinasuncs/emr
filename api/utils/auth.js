require('dotenv').config()
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const { Strategy, ExtractJwt } = require('passport-jwt');
const JWTStrategy = Strategy;
const secretOrKey = 'secret';

const User = require('../models/User');

const cookieExtractor = function(req) {
    let token = null;
    if (req && req.cookies) token = req.cookies['x-auth-cookie'];
    console.log(req.cookies)
    return token;
};

const init = () => {
    passport.use(new JWTStrategy(
        {
            jwtFromRequest: cookieExtractor,
            secretOrKey
        }, async (data, done) => {
            console.log(data);
            const user = await User.findById(data.id);

            if (user) done(null, user);
            else done(null, false);
        }
    ));

    passport.use('google', new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: 'https://electronic-medical-record-uqm3.onrender.com/api/uac/google/callback'
    },
    function(_request, _accessToken, _refreshToken, profile, done) {
        User.findOrCreate({ email: profile.email }, { name: profile.displayName, role: 'Patient' }, function (err, user) {
            return done(err, user);
        });
    }));
}


module.exports = init;