const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const streetData = require("../lib/streetData");
const yr = require("../lib/yearData");
const crimeData = require("../lib/crimeTypeData");
const Crime = require("../models/crimeModel");
const Street = require('../models/streetModel');

var cdata;

// for parsing application/json
router.use(bodyParser.json());

// for parsing application/xwww-
router.use(bodyParser.urlencoded({ extended: true }));

// get for crime app based on street search
router.get("/block", async (req, res, next) => {
	//Get block to search for
	console.log("Search for block");
	console.log(req.query.block);

	try {
		cdata = await streetData.getStreetData(req.query.block);


		const blockData = new Street({
			_id : new mongoose.Types.ObjectId(),
			block_searched : req.query.block
		});
	
		// after connecting to db - we are saving it in db
		blockData.save().then(result =>{
			// after storing search data in db display data
			res.render("main", { crimes: cdata });

		}).catch(err =>{
			console.log(err);
			res.status(500).json({
				error : err
			});
		});


	} catch (e) {
		//this will eventually be handled by your error handling middleware
		next(e);
	}
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

// get for crime app based on street search
router.get("/crimesByCrimeType", async (req, res, next) => {
	//Get Street to search for
	console.log("Search for crime by crime type");
	try {
		cdata = await crimeData.getCrimeByCrimeType(req.query.crimeType);

		const crimeTypeSearched = new Crime({
			_id : new mongoose.Types.ObjectId(),
			crime_type_searched : req.query.crimeType
		});

		// after connecting to db - we are saving it in db
		crimeTypeSearched.save().then(result =>{
			// after storing search data in db display data
			res.render("main", { crimes: cdata });
		}).catch(err =>{
			console.log(err);
			res.status(500).json({
				error : err
			});
		}); 

	} catch (e) {
		//this will eventually be handled by your error handling middleware
		next(e);
	}
});

module.exports = router;