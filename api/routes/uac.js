const router = require('express').Router();

const passport = require('passport')

router.get('/google', passport.authenticate('google', { scope: ['email', 'profile'] }));

router.get(
    '/google/callback', 
    passport.authenticate('google', {
        failureRedirect: 'http://localhost:5173/login',
        session: false
    }), 
    (req, res) => {
        const token = req.user.generateJWT();
        res.cookie('x-auth-cookie', token);
        res.redirect('http://localhost:5173/patients');
    }
);

module.exports = router;