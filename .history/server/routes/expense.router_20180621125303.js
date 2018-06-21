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
	if (req.isAuthenticated()) {
		const queryText = `INSERT INTO employment_database ("company_name", "market", "application_status", "application_date", "response_received", "phone_interview_date", "notes") VALUES ($1, $2, $3, $4,$5);`;
		pool
			.query(queryText, [ req.body.company_name, req.body.market, req.body.application_status, req.body.application_date, req.body.response_received, req.body.phone_interview_date, req.body.notes])
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


