const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Crime = require('../models/crimeModel');
const Street = require('../models/streetModel');

// Add new crime
router.post('/newCrime', (req, res, next) =>{
	// _id is set to a mongodb generated objectId
	
	const newCrime = new Crime({
		_id : new mongoose.Types.ObjectId(),
		name : req.body.name,
	});
	
	// after connecting to db - we are saving it in db
	newCrime.save().then(result =>{
		res.status(201).json({
			message : "New crime added successfully",
			CrimeData : newCrime
		});
	}).catch(err =>{
		console.log(err);
		res.status(500).json({
			error : err
		});
	});
});

// Add new street
router.post('/newStreet', (req, res, next) =>{
    const newStreet = new Street({
        _id : new mongoose.Types.ObjectId(),
        date : req.body.date,
        block_name_searched : req.body.block_name_searched,
        block_name : req.body.block_name,
        location_description :req.body.location_description
    });

    // after connecting to db - we are saving it in db
    newStreet.save().then(result =>{
        res.status(201).json({
            message : "New street added successfully",
            StreetData : newStreet
        });
    }).catch(err =>{
        console.log(err);
        res.status(500).json({
            error : err
        });
    });
});

module.exports = router;