const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();





router.get('/', (req, res) => {
	console.log('mileage Get route');
	let queryText = `SELECT * FROM mileage;`;
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
	if (req.isAuthenticated()) {
		const queryText = `INSERT INTO mileage ("description") VALUES ($1);`;
		pool
			.query(queryText, [ req.body.newMileage ])
			.then((result) => {
				res.sendStatus(201);
			})
			.catch((err) => {
				console.log(err);
				res.sendStatus(500);
			});
	} else {
		res.sendStatus(403);
	}
});

router.delete('/:id', (req, res) => {
    console.log('in DELETE mileage router', req.params.id)
    const queryText = `DELETE FROM mileage WHERE id=$1`;
    pool.query(queryText, [req.query.id])
    .then(() => {res.sendStatus(200);
    }).catch((err) => {
        console.log('Error completing SELECT plany query', err);
        res.sendStatus(500);
    });
});

module.exports = router;