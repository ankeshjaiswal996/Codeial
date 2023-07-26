const express = require('express');
const router = express.Router();
const passport = require('passport');

const userscontroller = require('../controllers/users_controller');


router.get('/profile',passport.checkAuthentication, userscontroller.profile);

router.get('/Sign-up',userscontroller.signup);
router.get('/Sign-in',userscontroller.signin);
router.get('/post', userscontroller.post);

router.post('/create', userscontroller.create);
//router.post('/create-session', userscontroller.createSession);

router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'}
), userscontroller.createSession);

router.get('/sign-out', userscontroller.destroySession);

module.exports=router;