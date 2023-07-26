const Post = require('../models/post');
const { post } = require('../routes/posts');

module.exports.home = async function (req, res) {
    try {
        const posts = await Post.find({}).populate('user') // Fetch all posts from the database and populate the 'user' field
        return res.render('home', {
            title: "Codeial | Home",
            posts: posts
        });
    } catch (err) {
        console.error("Error fetching posts:", err);
        return res.status(500).send("Internal Server Error");
    }
}