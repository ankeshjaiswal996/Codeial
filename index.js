const express = require('express');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');

app.use(expressLayouts);
//extract style and script from sub page into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.use(express.static('./assets'));
//use express router
app.use('/',require('./routes'));

//set up view engine
app.set('view engine', 'ejs');
app.set('views', './views');

app.listen(port, function(err){
    if(err){
        console.log(`Error in runnig the server:${err}`);
    }
    console.log(`server is running on port : ${port}`);

});