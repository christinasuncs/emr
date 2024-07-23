const router = require('express').Router();

const passport = require('passport')

router.get('/google', passport.authenticate('google', { scope: ['email', 'profile'] }));

router.get(
    '/google/callback', 
    passport.authenticate('google', {
        failureRedirect: 'https://electronic-medical-record-website.onrender.com/login',
        session: false
    }), 
    (req, res) => {
        const token = req.user.generateJWT();
        res.cookie('x-auth-cookie', token, { sameSite: 'None', secure: true });
        res.redirect('https://electronic-medical-record-website.onrender.com');
    }
);

module.exports = router;