/** @file An ExpressJS app to display Chicago Crime Analysis Data.
* @author Team MCP ITMD-567 Spring 2020 Semester
* @copyright Team MCP
* @license
* Copyright 2020 by Team MCP ITMD-567
*
* Permission to use, copy, modify, and/or distribute this software for any purpose with or without
* fee is hereby granted, provided that the above copyright notice and this permission notice appear
* in all copies.
*
* THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS
* SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE
* AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
* WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT,
* NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE
* OF THIS SOFTWARE.
*/

/** Requires the express module of the `express` library.
* @requires express
*/
const express = require("express");
/** Requires the mongoose module of the `mongoose` library.
* @requires mongoose
*/
const mongoose = require("mongoose");
/** Requires the bodyparser module of the `bodyparser` library.
* @requires bodyparser
*/
const bodyparser = require("body-parser");
/** Requires the handlebars module of the `handlebars` library.
* @requires handlebars
*/
const handlebars = require("express-handlebars");
/** Requires the connectDB module of the `connectDB` library.
* @requires connectDB
*/
const connectDB = require("./lib/db");
/** Requires the cr module of the `cr` library.
* @requires cr
*/
const cr = require("./lib/streetData");

const app = express();
require("dotenv/config");

//Import post routes
/** Requires the postsRoute module of the `postsRoute` library.
* @requires postsRoute
*/
const postsRoute = require("./routes/posts");
//Import gets routes
/** Requires the getsRoute module of the `getsRoute` library.
* @requires getsRoute
*/
const getsRoute = require("./routes/gets");

let cdata;

//middleware
app.use(bodyparser.json());
app.use("/gets", getsRoute);
app.use("/posts", postsRoute);

app.use(express.static(__dirname + "/public"));

// set the port of our application
// process.env.PORT lets the port be set by Heroku
//Needed for heroku
const PORT = process.env.PORT || 3000;

//Handlebar engine
//Sets handlebars configurations (we will go through them later on)
app.engine(
	"handlebars",
	handlebars({
		layoutsDir: __dirname + "/views/layouts",
		defaultLayout: "index"
	})
);
app.set("view engine", "handlebars");

//load inital crime data fill it with main html data into body

app.get("/", async (req, res, next) => {
	//Serves the body of the page aka "main.handlebars" to the container //aka "index.handlebars"
	//res.render('main', {layout : 'index'});
	try {
		cdata = await cr.getAllData();
	} catch (e) {
		//this will eventually be handled by your error handling middleware
		next(e);
	}
	res.render("main", { crimes: cdata });
});

// Connect to database
connectDB();

// lisgerner
//app.listen(3000);
app.listen(PORT, () => {
	console.log(`Our app is running on port ${PORT}`);
});
