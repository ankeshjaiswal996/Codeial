const express = require('express');
const router = express.Router();


const usersPost = require('../controllers/users_post');

router.get('/post',usersPost.post);

module.exports=router;