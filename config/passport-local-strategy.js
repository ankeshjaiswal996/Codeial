const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

// authentication using passport
passport.use(new LocalStrategy({
        usernameField: 'email'
        // passReqToCallback: true
    },
    async function(email, password, done){
        // find a user and establish the identity
        let user = await User.findOne({email: email})

            if (!user || user.password != password){
                req.flash('error','Invalid Username/Password');
                return done(null, false);
            }

            return done(null, user);
        }
));

// serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user, done){
    done(null, user.id);
});

// deserializing the user from the key in the cookies
passport.deserializeUser(
    async function(id, done){
    let user =await User.findById(id)

        return done(null, user);
    });

// check if the user is authenticated
passport.checkAuthentication =function(req, res, next){
    //if sign in pass it to next function (controller action)
    if(req.isAuthenticated()){
        return next();
    }
    // if not sign in 
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser = function(req, res, next){
    if (req.isAuthenticated()){
        // req.user contains the current signed in user from the session cookie and we are just sending this to the locals for the views
        res.locals.user = req.user;
    }

    next();
}

module.exports = passport;