/** Express gets routes provides crime data pulls for the user
 * @module routers/gets
 * @requires express
 */

 /**
 * express module
 * @const
 */
const express = require("express");

/**
 * Express router to mount user related functions on.
 * @type {object}
 * @const
 * @namespace router
 */
const router = express.Router();

const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const streetData = require("../lib/streetData");
const crimeData = require("../lib/crimeTypeData");
const Crime = require("../models/crimeModel");
const Street = require('../models/streetModel');

var cdata;

// for parsing application/json
router.use(bodyParser.json());

// for parsing application/xwww-
router.use(bodyParser.urlencoded({ extended: true }));

/**
 * Route get crimes based on block to search for
 * @name get/block
 * @function
 * @memberof module:routers/gets~router
 * @function
 * @name block
 * @param {object} req - request object
 * @param {object}	res - request object
 * @param {callback} middleware - Express middleware.
 */
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
 
/**
 * Route get crimes based on the date year selected
 * @name get/year
 * @function
 * @memberof module:routers/gets~router
 * @function
 * @name year
 * @param {object} req - request object
 * @param {object}	res - request object
 * @param {callback} middleware - Express middleware.
 */

/**
 * Route get all crimes based on crime type selected
 * @name get/crimesByCrimeType
 * @function
 * @memberof module:routers/gets~router
 * @function
 * @name crimesByCrimeType
 * @param {object} req - request object
 * @param {object}	res - request object
 * @param {callback} middleware - Express middleware.
 */
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

/**
 * Route get crimes based on streets
 * @name get/streets
 * @function
 * @memberof module:routers/gets~router
 * @function
 * @name streets
 * @param {object} req - request object
 * @param {object}	res - request object
 * @param {callback} middleware - Express middleware.
 */
router.get('/streets', (req, res, next) => {

	Street.find()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving streets"
      });
    });

});

/**
 * Route get all crimes to display
 * @name get/crimes
 * @function
 * @memberof module:routers/gets~router
 * @function
 * @name crimes
 * @param {object} req - request object
 * @param {object}	res - request object
 * @param {callback} middleware - Express middleware.
 */
router.get('/crimes', (req, res, next) => {

	Crime.find()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Crimes"
      });
    });

});


module.exports = router;