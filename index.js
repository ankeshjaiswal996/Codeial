const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
// used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo');
const nodesass = require('node-sass');
var flash = require('connect-flash');
const customMware= require('./config/middleware');


app.use(express.urlencoded());

app.use(cookieParser());

app.use(expressLayouts);
//extract style and script from sub page into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.use(express.static('./assets'));


//set up view engine
app.set('view engine', 'ejs');
app.set('views', './views');

//mogo store is used to store the session cookie in the db

app.use(session({
    name: 'codeial',
//todo change the secret befoore deployement in production mode
    secret: 'blashsomething',
    saveUninitialized: false,
    resave: false,
    cookie:{
        maxAge: (1000*60*100)
    },
    store: MongoStore.create(
        {
            mongoUrl: 'mongodb://127.0.0.1/codeial_development',
            autoRemove: 'disabled'
        },
        function(err){
            console.log(err || 'connect-mongodb setup ok');
        }
    )
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);
app.use(flash());
app.use(customMware.setFlash);

//use express router
app.use('/',require('./routes'));

app.listen(port, function(err){
    if(err){
        console.log(`Error in runnig the server:${err}`);
    }
    console.log(`server is running on port : ${port}`);

});