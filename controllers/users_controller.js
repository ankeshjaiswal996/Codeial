const User = require('../models/user');

module.exports.profile= function(req,res){
    return res.render('user_profile',{
        title: "user Profile"
    });
}

module.exports.signup = function(req,res){
if(req.isAuthenticated()){
    return res.redirect('/user/profile');
}
    return res.render('user_signup',{
        title: "Codeial | Sign Up"
    });
}

module.exports.signin = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/user/profile');
    }
    return res.render('user_signin',{
        title: "Codeial | Sign In"
    });
}

module.exports.post= function(req,res){
    return res.render('post',{
        title: "CodeialPost"
    });
}

// get the sign up data
module.exports.create = async function(req, res){
    try {
        if (req.body.password != req.body.confirm_password){
            return res.redirect('back');
        }
    
        let user = await User.findOne({email: req.body.email})
            if (!user){
    
                let user = await User.create(req.body)
                    return res.redirect('/users/sign-in');
            }
            else{
                return res.redirect('back');
            }
        }   
    catch (error) {
        console.log("error",error);
    }
}

// sign in and create a session for the user
// module.exports.createSession = async function(req, res){
//     // steps to authenticate
//     // find the user
//     let user = await User.findOne({email: req.body.email})
//         // handle user found
//         if (user.password != req.body.password){
//             return res.redirect('back');
//         }else{
//             // handle user not found
//             res.cookie('user_id', user.id);
//             return res.redirect('/users/profile');  
//         }
        
//     };

// sign in and create a session for the user
module.exports.createSession = function(req,res){
    return res.redirect('/');
}

module.exports.destroySession = function(req, res){
    req.logout(req.user, err => {
        if(err) return ;
        res.redirect("/");
      });
    return res.redirect('/');
}