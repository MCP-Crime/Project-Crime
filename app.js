const express = require("express");
const handlebars = require("express-handlebars");
const bodyparser = require("body-parser");
const connectDB = require("./lib/db");

const app = express();

require("dotenv").config();

app.use(express.static(__dirname + "/public"));

// set the port of our application
// process.env.PORT lets the port be set by Heroku
const PORT = process.env.PORT || 3000;

//middleware
app.use(bodyparser.json());

//Handlebar engine
//Sets handlebars configurations
app.engine(
	"handlebars",
	handlebars({
		layoutsDir: __dirname + "/views/layouts",
		defaultLayout: "index"
	})
);
app.set("view engine", "handlebars");

//Serves the body of the page aka "main.handlebars" to the container //aka "index.handlebars"
app.get("/", (req, res) => {
	//res.render('main', {crimes: cdata});
	res.render("main", { layout: "index" });
});

// Connect to database
connectDB();

// lisgerner
//app.listen(3000);
app.listen(PORT, () => {
	console.log(`Our app is running on port ${PORT}`);
});
