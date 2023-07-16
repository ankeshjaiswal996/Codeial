const express = require('express');
const router = express.Router();

const usersProfile = require('../controllers/users_profile');


router.get('/profile',usersProfile.profile);



module.exports=router;