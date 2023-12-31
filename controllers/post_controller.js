const Post = require('../models/post');
const Comment = require('../models/comment')


module.exports.create = async function(req, res){
    try {
        let post = await Post.create({
            content: req.body.content,
            user: req.user._id
        });

        if (req.xhr){
            post =await post.populate('user','name')
            return res.status(200).json({
                data: {
                    post: post
                },
                message: "Post created!"
            });
        }
        
        
        req.flash('success', 'post published!');
        return res.redirect('back');

    } catch (error) {
        req.flash('error',error);
        return res.redirect('back');
        // Handle the error here (e.g., return an error response to the client).
    }
}

module.exports.destroy = async function(req, res) {
    try {
        let post = await Post.findById(req.params.id);

        // .id means converting the object id into string
        if (post.user == req.user.id) {
            await post.deleteOne();

            await Comment.deleteMany({ post: req.params.id });
            if (req.xhr){
                return res.status(200).json({
                    data: {
                        post_id: req.params.id
                    },
                    message: "Post deleted"
                });
            }
            req.flash('success', 'post and associated comment deleted!');
            return res.redirect('back');
        }else{
            req.flash('error', 'You cannot delete this post');
            return res.redirect('back');
        }
    } catch (error) {
        req.flash('error',error);
        return res.redirect('back');
    }
};