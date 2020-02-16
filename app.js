const express = require('express');

const app = express();

//routes
app.get('/', (req,res) => {
    res.send('Chicago Crime Analyst Team Project');    
});

// lisgerner
app.listen(3000);
