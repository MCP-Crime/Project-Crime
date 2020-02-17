const express = require('express');
const handlebars = require('express-handlebars');
const bodyparser = require('body-parser');

const app = express();

//Import post routes
//const postsRoute = require('./routes/posts');
//Import gets routes
//const getsRoute = require('./routes/gets');

//middleware
app.use(bodyparser.json());
//Set Route folders for all gets and Posts
//app.use('/gets', getsRoute);
//app.use('/posts', postsRoute);

//Handlebar engine
//Sets handlebars configurations
app.engine('handlebars', handlebars({
    layoutsDir: __dirname + '/views/layouts',defaultLayout: 'index',
    }));
app.set('view engine', 'handlebars');

//Serves the body of the page aka "main.handlebars" to the container //aka "index.handlebars"
app.get('/', (req,res) => {
    //res.render('main', {crimes: cdata});
    res.render('main', {layout : 'index'});   
});

// lisgerner
app.listen(3000);