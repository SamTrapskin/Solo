const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

		//GET ROUTE TO SERVER FOR EXPENSE TABLE//

router.get('/', (req, res, next) => {
	console.log('Expense Get route');
	let queryText = `SELECT * FROM items ORDER BY purchase_date DESC;`;
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
			//END GET ROUTE//


		//POST ROUTE TO SERVER FOR EXPENSE TABLE//


		router.post('/', (req, res, next) => {
			console.log('POST Route');
			console.log(req.body);
			// if (req.isAuthenticated()) {
				const queryText = `INSERT INTO items ("item_description", "purchase_date", "item_price", "item_link") VALUES ($1, $2, $3, $4);`;
				pool
					.query(queryText, [ req.body.item_description, req.body.purchase_date, req.body.item_price, req.body.item_link])
					.then((result) => {
						res.sendStatus(201);
					})
					.catch((err) => {
						console.log(err);
						res.sendStatus(500);
					});
			// } else {
				res.sendStatus(403);
			}
		});

		//END POST ROUTE



		//DELETE ROUTE TO SERVER FOR EXPENSE TABLE//

router.delete('/:id', function(req,res, next){
	console.log(req.body)
    let queryText = 'DELETE FROM "items" WHERE id=$1';
    pool.query(queryText, [req.params.id])
        .then((respose)=>{
            res.sendStatus(200);
        })
        .catch((error)=>{
            console.log('an error from the server in delete ', error);
            res.sendStatus(500);
        })
})
		//END DELETE ROUTE

router.put('/', (req, res) => {
const updatedExpense = req.body;
const queryText = `UPDATE items SET "item_description" = $1, "purchase_date" = $2, "item_price" = $3, "item_link" = $4 WHERE id=$5;`;
const queryValues = [
			updatedExpense.item_description,
			updatedExpense.purchase_date,
			updatedExpense.item_price,
			updatedExpense.item_link,
			updatedExpense.id
			];
pool.query(queryText, queryValues)
	.then(() => { res.sendStatus(200); })
		.catch((err) => {
		console.log('Error completing SELECT items query', err);
				res.sendStatus(500);
			  });
		  });


module.exports = router;


