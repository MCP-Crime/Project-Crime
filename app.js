const express = require('express');
const handlebars = require('express-handlebars');

const app = express();

app.use('/gets', getsRoute);
app.use('/posts', postsRoute);

//Handlebar engine
//Sets handlebars configurations
app.engine('handlebars', handlebars({
    layoutsDir: __dirname + '/views/layouts',defaultLayout: 'index',
    }));
app.set('view engine', 'handlebars');





//routes
app.get('/', (req,res) => {
    res.send('Chicago Crime Analyst Team Project');    
});

// lisgerner
app.listen(3000);
