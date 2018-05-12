// const express = require('express');
// const pool = require('../modules/pool');
// const router = express.Router();





// router.get('/', (req, res) => {
// 	console.log('mileage Get route');
// 	let queryText = `SELECT * FROM image;`;
// 	pool
// 		.query(queryText)
// 		.then((result) => {
// 			res.send(result.rows);
// 		})
// 		.catch((error) => {
// 			console.log(error);
// 			res.sendStatus(500);
// 		});
// });

// router.post('/', (req, res, next) => {
// 	console.log('POST Route');
// 	console.log(req.body);
// 	if (req.isAuthenticated()) {
// 		const queryText = 'INSERT INTO image ("id", "url") VALUES ($1, $2);';
// 		pool
// 			.query(queryText, [req.body.id, req.body.url])
// 			.then((result) => {
// 				res.sendStatus(201);
// 			})
// 			.catch((err) => {
// 				console.log(err);
// 				res.sendStatus(500);
// 			});
// 	} else {
// 		res.sendStatus(403);
// 	}
// });

// module.exports = router;

