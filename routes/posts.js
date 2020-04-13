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
// router.post('/newStreet', (req, res, next) =>{
//     const blockData = new Street({
//         _id : new mongoose.Types.ObjectId(),
//         block_name_searched : req.body.block_name_searched
//     });

//     // after connecting to db - we are saving it in db
//     Street.save().then(result =>{
//         res.status(201).json({
//             message : "Block searched added to db successfully",
//             blockData : blockData
//         });
//     }).catch(err =>{
//         console.log(err);
//         res.status(500).json({
//             error : err
//         });
//     });
// });

module.exports = router;