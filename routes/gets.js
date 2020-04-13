const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const cr = require("../lib/streetData");
const yr = require("../lib/yearData");
const Crime = require("../models/crimeModel");
const Street = require('../models/streetModel');

var cdata;

// for parsing application/json
router.use(bodyParser.json());

// for parsing application/xwww-
router.use(bodyParser.urlencoded({ extended: true }));

//get db data
router.get("/crimeTypes", async (req, res, next) => {
	//Get crime data
	Crime.find().exec().then(doc =>{
		if(doc != null){
			console.log(doc);
			res.status(200).json({
				cdata : doc
			});
			// res.render('main',{crimes : cdata});
		}
		else{
			console.log(doc);
			res.status(404).json({
				message : "Crimes not found"
			});
		}
	}).catch(err =>{		
		console.log(err);
		res.status(500).json({
			error : err
		});
	});
});

// get for crime app based on street search
router.get("/block", async (req, res, next) => {
	//Get block to search for
	console.log("Search for block");
	console.log(req.query.block);

	try {
		cdata = await cr.getStreetData(req.query.block);


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
		cdata = await cr.getCrimeByCrimeType(req.query.crimeType);
	} catch (e) {
		//this will eventually be handled by your error handling middleware
		next(e);
	}
	res.render("main", { crimes: cdata });
});

module.exports = router;