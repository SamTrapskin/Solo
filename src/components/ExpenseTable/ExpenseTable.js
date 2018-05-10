import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from '../../components/Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import { triggerLogout } from '../../redux/actions/loginActions';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
import EditIcon from 'material-ui/svg-icons/image/edit';
import TrashIcon from 'material-ui/svg-icons/action/delete';
import DatePicker from 'material-ui/DatePicker';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

//STYLE VARIABLE FOR MATERIAL BUTTON
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
			open: false,
			getExpense: [],
			currentRow: {}
		};
		// this.state = {
		// 	controlledDate: null,
		//   };
	}

	isSelected = (index) => {
		return this.state.selected.indexOf(index) !== -1;
	};

	handleOpen = () => {
		this.setState({ open: true });
	};

	handleClose = () => {
		this.setState({ open: false });
	};

	addItUp = () => {
		let sum = 0;
		for (let i = 0; i < this.state.item_price.length; i++) {
			if (this.state.item_price[i].className == 'count-me') {
				sum += isNaN(this.state.item_price[i].innerHTML) ? 0 : parseInt(this.state.item_price[i].innerHTML);
			}
		}
	};

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

	handleChange = (event, date) => {
		this.setState({
			controlledDate: date
		});
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

	handleClickEdit = (event) => {
		this.setState({
			open: true,
			currentRow: event,
			editDescription: !this.state.editDescription
		});
		console.log('edit expense', this.state);
		this.props.dispatch({
			type: 'EDIT_DESCR',
			payload: this.state
		});
	};

	handleOnSubmit = () => {
		console.log('update expense', this.state);
		

		this.props.dispatch({
			type: 'UPDATE_EXPENSE',
			payload: this.state.currentRow
		});

		this.handleClose();
	};

	render() {
		console.log('HEY-oooo expense render', this.state);
		let content = null;

		if (this.props.user.userName) {
			const actions = [
				<FlatButton label="Cancel" primary={true} onClick={this.handleClose} />,
				<FlatButton label="Submit" primary={true} onClick={this.handleOnSubmit} />
			];

			//MAP OVER REDUX STATE.
			const tableRows = this.props.reduxState.map((row) => {
				//.MAP SEPARATES DATA INTO INDIVIDUAL ITEMS.
				const { id, item_description, purchase_date, item_price, item_link } = row;
				return (
					// TABLE ROWS //
					<TableRow selectable={false} key={id}>
						<TableRowColumn>{item_description}</TableRowColumn>
						<TableRowColumn>{purchase_date}</TableRowColumn>
						<TableRowColumn id="count-me">${item_price}</TableRowColumn>
						<TableRowColumn>
							<a href={item_link}>{item_link}</a>
						</TableRowColumn>
						<TableRowColumn>
							<EditIcon
								onClick={() => {
									this.handleClickEdit(row);
								}}
							/>
						</TableRowColumn>
						<TableRowColumn>
							<TrashIcon
								onClick={() => {
									this.handleClickRemove(id);
								}}
							/>
						</TableRowColumn>
					</TableRow>

					// END TABLE ROWS//
				);
			});

			//HYPERLINKS THE LINK COLUMN//
			<a href="#child4">My clickable text</a>;
			content = (
				<div>
					{/* FORM FOR ADDING EXPENSE (DATA) */}

					<form id="expenseForm">
						<h3>
							Add a new <br />
							expense
						</h3>
						<input
							type="text"
							id="fname"
							name="desc"
							placeholder="Item description"
							onChange={this.handleChange('item_description')}
						/>

						<br />

						<DatePicker
							hintText="Controlled Date Input"
							value={this.state.controlledDate}
							onChange={this.handleDateChange}
						/>

						<br />

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

						{/* FORM SUBMIT BUTTON */}
						<RaisedButton
							id="expSubmit"
							label="Submit Expense"
							primary={true}
							style={style}
							onClick={this.handleClick}
						/>
						{/* TABLE TOTAL KEEPS CURRENT TOTAL OF PRICE COLOUMN */}

						<h2>Total Expenses</h2>
						<br />
						<h3>{this.state.item_price}</h3>
					</form>

					{/* TABLE HEADERS */}
					<Table className="expenseTable">
						{/* <table> */}
						<TableHeader>
							<TableRow className="expenseTable">
								<TableHeaderColumn className="expenseTable">Item description</TableHeaderColumn>
								<TableHeaderColumn>Purchase Date</TableHeaderColumn>
								<TableHeaderColumn>Item Price</TableHeaderColumn>
								<TableHeaderColumn>Item Link</TableHeaderColumn>
								<TableHeaderColumn>Edit entry</TableHeaderColumn>
								<TableHeaderColumn>Delete entry</TableHeaderColumn>
							</TableRow>
						</TableHeader>

						<TableBody>{tableRows}</TableBody>
					</Table>

					{/* //SECTION FOR UPDATING ITEMS// */}
					<div>
						<Dialog
							title={`Change Item info for ${this.state.currentRow.item_description}???`}
							actions={actions}
							modal={true}
							open={this.state.open}
						>
							<TextField
								id="price"
								value={this.state.currentRow.item_price}
								onChange={(event) => {
									this.setState({
										currentRow: {
											...this.state.currentRow,
											item_price: event.target.value
										}
									});
								}}
								hintText="Price"
							/>
							<TextField
								id="purchase date"
								value={this.state.currentRow.purchase_date}
								onChange={(event) => {
									this.setState({
										currentRow: {
											...this.state.currentRow,
											purchase_date: event.target.value
										}
									});
								}}
								hintText="Purchase Date"
							/>
							<TextField
								id="description"
								value={this.state.currentRow.item_description}
								onChange={(event) => {
									this.setState({
										currentRow: {
											...this.state.currentRow,
											item_description: event.target.value
										}
									});
								}}
								hintText="Item Description"
							/>
						</Dialog>
					</div>
					{/* //END SECTION FOR UPDATING ITEMS// */}
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
