const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();





router.get('/', (req, res) => {
	console.log('mileage Get route');
	let queryText = `SELECT * FROM mileage ORDER BY id DESC;`;
	pool
		.query(queryText)
		.then((result) => {
			res.send(result.rows);
		})
		.catch((error) => {
			console.log(error);
			res.sendStatus(500);
		});
});

router.post('/', (req, res, next) => {
	console.log('POST Route');
	console.log(req.body);
		const queryText = 'INSERT INTO mileage ("description", "travel_date","address", "total_miles") VALUES ($1, $2, $3, $4);';
		pool
			.query(queryText, [req.body.description, req.body.travel_date, req.body.address, req.body.total_miles ])
			.then((result) => {
				res.sendStatus(201);
			})
			.catch((err) => {
				console.log(err);
				res.sendStatus(500);
			});
	 
});

router.delete('/:id' , (req, res,next) => {
    console.log('in DELETE mileage router', req.body)
    const queryText = `DELETE FROM "mileage" WHERE id=$1`;
    pool.query(queryText, [req.params.id])
    .then(() => {res.sendStatus(200);
    }).catch((err) => {
        console.log('Error completing SELECT  query', err);
        res.sendStatus(500);
    });
});

router.put('/', (req, res) => {
	const updatedMileage = req.body;
	const queryText = `UPDATE mileage SET "description" = $1, "address" = $2, "travel_date" = $3, "total_miles" = $4 WHERE id=$5;`;
	const queryValues = [
				updatedMileage.description,
				updatedMileage.address,
				updatedMileage.travel_date,
				updatedMileage.total_miles,
				updatedMileage.id
				];
	pool.query(queryText, queryValues)
		.then(() => { res.sendStatus(200); })
			.catch((err) => {
			console.log('Error completing SELECT mileage query', err);
					res.sendStatus(500);
				  });
			  });
	

module.exports = router;