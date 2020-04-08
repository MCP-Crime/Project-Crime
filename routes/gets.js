const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const cr = require("../lib/streetData");
const yr = require("../lib/yearData");

var cdata;

// for parsing application/json
router.use(bodyParser.json());

// for parsing application/xwww-
router.use(bodyParser.urlencoded({ extended: true }));

// New inital get for crime app based on street search
router.get("/street", async (req, res, next) => {
	//Get Street to search for
	console.log("Search for street");
	console.log(req.query.street);

	try {
		cdata = await cr.getStreetData(req.query.street);
	} catch (e) {
		//this will eventually be handled by your error handling middleware
		next(e);
	}
	res.render("main", { crimes: cdata });
});

// New get for crime app based on year search
router.get("/year", async (req, res, next) => {
	//Get Street to search for
	console.log("Search for year");
	console.log(req.query.year);
	try {
		cdata = await yr.getYearData(req.query.year);
	} catch (e) {
		//this will eventually be handled by your error handling middleware
		next(e);
	}
	res.render("main", { crimes: cdata });
});

module.exports = router;