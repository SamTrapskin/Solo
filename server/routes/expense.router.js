const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

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


router.delete('/:id', (req, res) => {
    const queryText = `DELETE FROM items WHERE id=$1`;
    pool.query(queryText, [req.query.id])
    .then(() => {res.sendStatus(200);
    }).catch((err) => {
        console.log('Error completing SELECT plany query', err);
        res.sendStatus(500);
    });
});

module.exports = router;


// router.delete('/', (req, res) => {
//     const queryText = 'DELETE FROM plant WHERE id=$1';
//     pool.query(queryText, [req.query.id])
//       .then(() => { res.sendStatus(200); })
//       .catch((err) => {
//         console.log('Error completing SELECT plant query', err);
//         res.sendStatus(500);
//       });
//   });