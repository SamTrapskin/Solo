const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const expenseList = [];

/**
 * GET route template
 */
router.get('/', (req, res) => {
	console.log('Expense Get route');
	let queryText = `SELECT * FROM items;`;
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

/**
 * POST route template
 */

router.post('/', (req, res, next) => {
	console.log('POST Route');
	console.log(req.body);
	if (req.isAuthenticated()) {
		const queryText = `INSERT INTO items ("item_description") VALUES ($1);`;
		pool
			.query(queryText, [ req.body.newExpense ])
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

module.exports = router;
