const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = async function(req, res){
    try{
        let post = await Post.findById(req.body.post)

        if (post){
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id                
            })
            post.comments.push(comment),
            post.save(),
            req.flash('success', 'commented successfully');
            res.redirect('/');   
        }
    }catch(error){
        req.flash('error',error);
    }
}

module.exports.destroy =async function(req, res){
    try{
        let comment = await Comment.findById(req.params.id);

        if (comment.user == req.user.id){
            let postId = comment.post;
            await comment.deleteOne();
            let post = await Post.findByIdAndUpdate(postId, { $pull:
                {comments: req.params.id}})
                req.flash('success', 'comment deleted successfully');
            return res.redirect('back');
        }else{
            req.flash('error', 'You cannot delete this comment');
            return res.redirect('back');
        }
    }catch(error){
        req.flash('error',error);
            return;
        }
}
