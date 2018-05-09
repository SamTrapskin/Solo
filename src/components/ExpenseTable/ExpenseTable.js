
import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../../styles/main.css';
import logger from 'redux-logger';
import Nav from '../../components/Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import { triggerLogout } from '../../redux/actions/loginActions';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import PropTypes from 'prop-types';
import { FormControl } from 'react-bootstrap';
import EditIcon from 'material-ui/svg-icons/image/edit';
import TrashIcon from 'material-ui/svg-icons/action/delete';
import DatePicker from 'material-ui/DatePicker';

//STYLE VARIABLE BOR MATERIAL BUTTON
const style = {
	margin: 12
	//
};

const mapStateToProps = (state) => ({
	user: state.user,
	reduxState: state.getExpense
});

class ExpenseTable extends Component {
	constructor(props) {
		super(props);

		this.state = {
			getExpense: []
		};
	}

	//on page load, DISPATCH GET_EXPENSE is
	//SENT TO expenseSaga which then
	//goes to getExpenseReducer and appends EXPENSE_DATA to the
	//DOM
	componentDidMount() {
		const { id } = this.props.match.params;
		this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
		this.props.dispatch({ type: 'GET_EXPENSE' });
	}

	componentDidUpdate() {
		if (!this.props.user.isLoading && this.props.user.userName === null) {
			this.props.history.push('home');
		}
	}

	logout = () => {
		this.props.dispatch(triggerLogout());
		// this.props.history.push('home');
	};

	//SETS STATE FOR ALL INPUTS
	handleChange = (name) => {
		return (event) => {
			this.setState({
				[name]: event.target.value
			});
		};
	};

	//SUBMIT BUTTON- TRIGGERS DISPATCH TO EXPENSE SAGA TO ADD DATA
	handleClick = () => {
		console.log('add expense', this.state);
		this.props.dispatch({
			type: 'ADD_EXPENSE',
			payload: this.state
		});
	};

	//TRASH ICON-TRIGGERS DISPATCH TO EXPENSE SAGA DELETE
	handleClickRemove = (id) => {
		console.log('delete expense', this.state);
		this.props.dispatch({
			type: 'DELETE_EXPENSE',
			payload: id
		});
	};

	render() {
		console.log('HEY-oooo expense render', this.state);
		let content = null;
		if (this.props.user.userName) {

      //MAP OVER REDUX STATE.
      
const tableRows = this.props.reduxState.map((row) => {

        //.MAP SEPARATES DATA INTO INDIVIDUAL ITEMS.
        
				const { id, item_description, purchase_date, item_price, item_link } = row;
				return (
					<TableRow selectable={false}>
						{/* TABLE ROWS */}

						<TableRowColumn>{item_description}</TableRowColumn>
						<TableRowColumn>{purchase_date}</TableRowColumn>
						<TableRowColumn>{item_price}</TableRowColumn>
						<TableRowColumn>{item_link}</TableRowColumn>
						<TableRowColumn><EditIcon /></TableRowColumn>
            <TableRowColumn><TrashIcon onClick={() => {this.handleClickRemove(id);
						}}/>
						</TableRowColumn>
					</TableRow>

					// END TABLE ROWS
				);
			});

			content = (
				<div>
					{/* FORM FOR ADDING EXPENSES(DATA) */}

					<form id="expenseForm">
						<h3>
							Add a new <br />
							expense
						</h3>
						<input
							type="text"
							id="fname"
							name="fname"
							placeholder="Item description"
							onChange={this.handleChange('item_description')}
						/>

						<br />
						{/* <DatePicker
        hintText="Date of purchase"
        value={this.state.controlledDate}
        onChange={this.handleDateChange('controlledDate')} */}
						{/* /> */}
						<br />
						<input
							type="text"
							id="lname"
							name="lname"
							placeholder="Item price"
							onChange={this.handleChange('item_price')}
						/>
						<br />
						<input
							type="text"
							id="lname"
							name="lname"
							placeholder="Item link"
							onChange={this.handleChange('item_link')}
						/>
						<br />

						{/* END FORM */}

						<RaisedButton
							id="expSubmit"
							label="Submit Expense"
							primary={true}
							style={style}
							onClick={this.handleClick}
						/>
            {/* TABLE TOTAL KEEPS CURRENT TOTAL OF PRICE COLOUMN */}

						<h1>Total:</h1>
						<br />
						<h3>$748.93</h3>
					</form>


          {/* TABLE HEADERS */}
					<Table>
						<TableHeader>
							<TableRow>
								<TableHeaderColumn>Item description</TableHeaderColumn>
								<TableHeaderColumn>Purchase Date</TableHeaderColumn>
								<TableHeaderColumn>Item Price</TableHeaderColumn>
								<TableHeaderColumn>Item Link</TableHeaderColumn>
								<TableHeaderColumn />
								<TableHeaderColumn />
							</TableRow>
						</TableHeader>

						<TableBody>
							{tableRows}
						</TableBody>
					</Table>
				</div>
			);
		}

		return (
			<div>
				<Nav />
				{content}
			</div>
		);
	}
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(ExpenseTable);