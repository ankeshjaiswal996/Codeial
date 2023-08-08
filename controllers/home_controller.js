const Post = require('../models/post');
const User = require('../models/user')

module.exports.home = async function (req, res) {
    try {
        let posts = await Post.find({})
        .sort('-createAt')
        .populate('user')
        .populate({      // Fetch all posts from the database and populate the 'user' field
            path: 'comments',
            populate:{
                path: 'user'
            }
        })
        let users = await User.find({})
        return res.render('home', {
            title: "Codeial | Home",
            posts: posts,
            all_users: users
        });
    }
    catch(error) {
        console.log("Error fetching posts:", error);
        // return res.status(500).send("Internal Server Error");
    }
}