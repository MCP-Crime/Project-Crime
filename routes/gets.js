const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Crime = require('../models/crimeModel');
const Street = require('../models/streetModel');

//For handlebar index page
router.get('/about', (req,res) => {
    res.send('this is from get routers js file');
});

// Get all crimes
router.get('/getAllCrimes', (req, res, next) =>{
	Crime.find().exec().then(doc =>{
		if(doc != null){
			console.log(doc); 
			res.status(200).json({
				crimeData : doc
			});
		}
		else{
			console.log(doc);
			res.status(404).json({
				message : "Crime not found"
			});
		}
	}).catch(err =>{		
		console.log(err);
		res.status(500).json({
			error : err
		});
	});
});

// Get all streets data
router.get('/getAllStreets', (req, res, next) =>{
	Street.find().exec().then(doc =>{
		if(doc != null){
			console.log(doc); 
			res.status(200).json({
				streetData : doc
			});
		}
		else{
			console.log(doc);
			res.status(404).json({
				message : "Crime not found"
			});
		}
	}).catch(err =>{		
		console.log(err);
		res.status(500).json({
			error : err
		});
	});
});

// Get crime by Type
router.get('/getCrimeByType/:crime_type', (req, res, next) =>{
    const type = req.params.crime_type;
    
	// USING MONGODB findById method
	Crime.findById(type).exec().then(doc =>{
		console.log("From DB: " + doc);
		res.status(200).json({
			message : "Crime with type: " + type + " returned",
			crimeData : doc
		});

	}).catch(err =>{
		console.log(err);
		res.status(500).json({
			error : err
		});
	});
});


// Get street by Name
router.get('/getStreetByBlockName/:block_name', (req, res, next) =>{
    const name = req.params.block_name;
    
	// USING MONGODB findById method
	Street.findById(name).exec().then(doc =>{
		console.log("From DB: " + doc);
		res.status(200).json({
			message : "Street with name: " + name + " returned",
			streetData : doc
		});

	}).catch(err =>{
		console.log(err);
		res.status(500).json({
			error : err
		});
	});
});

// Get street by date
router.get('/getStreetByDate/:date', (req, res, next) =>{
    const date = req.params.date;
    
	// USING MONGODB findById method
	Street.findById(date).exec().then(doc =>{
		console.log("From DB: " + doc);
		res.status(200).json({
			message : "Street with search date: " + date + " returned",
			streetData : doc
		});

	}).catch(err =>{
		console.log(err);
		res.status(500).json({
			error : err
		});
	});
});

// Get crime by date
router.get('/getCirmeByDate/:date', (req, res, next) =>{
    const date = req.params.date;
    
	// USING MONGODB findById method
	Crime.findById(date).exec().then(doc =>{
		console.log("From DB: " + doc);
		res.status(200).json({
			message : "Crime with search date: " + date + " returned",
			streetData : doc
		});

	}).catch(err =>{
		console.log(err);
		res.status(500).json({
			error : err
		});
	});
});

module.exports = router;