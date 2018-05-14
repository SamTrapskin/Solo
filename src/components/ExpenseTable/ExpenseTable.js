import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from '../../components/Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import { triggerLogout } from '../../redux/actions/loginActions';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
import EditIcon from 'material-ui/svg-icons/image/edit';
import TrashIcon from 'material-ui/svg-icons/action/delete';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import show from 'mui-simple-snackbars';
import ReactFilestack, { client } from 'filestack-react';
import DateSelect from '../DateSelect/DateSelect';

import UserDeletedSnackbar from '../UserDeletedSnackbar/UserDeletedSnackbar';
import Snackbar from 'material-ui/Snackbar';
import moment from 'moment';
import Alert from '../Alert/Alert';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';

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
			currentRow: {},
			openAlert: false,
			actionType: '',
			alertText: {
				add: 'You have added a new expense successfully!',
				delete: 'You have deleted the expense!'
			}
		};
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

	handleCloseAlert = () => {
		this.setState({ openAlert: false });
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

	//SETS STATE FOR ALL INPUTS
	handleChange = (name, date) => {
		return (event) => {
			this.setState({
				[name]: event.target.value
			});
		};
	};

	handleDatePicker = (date) => {
		date = moment(date).format('MM/DD/YYYY');
		console.log('handling date change', date);
		this.setState((prevState) => ({
			currentRow: {
				...prevState.currentRow,
				purchase_date: date
			},
			purchase_date: date,
			actionType: 'date'
		}));
	};

	//SUBMIT BUTTON- TRIGGERS DISPATCH TO EXPENSE SAGA TO ADD DATA
	handleClick = () => {
		console.log('add expense', this.state);
		this.setState({
			actionType: 'add'
		});
		this.props.dispatch({
			type: 'ADD_EXPENSE',
			payload: this.state
		});

		this.setState({
			openAlert: true
		});
	};

	//TRASH ICON-TRIGGERS DISPATCH TO EXPENSE SAGA DELETE
	handleClickRemove = (id) => {
		console.log('delete expense', this.state);
		this.setState({
			actionType: 'delete'
		});

		this.props.dispatch({
			type: 'DELETE_EXPENSE',
			payload: id
		});

		this.setState({
			openAlert: true
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

	// FOR FUTURE RELEASE////////////////////////////
	// handleUpload = (result) => {
	// 	this.setState({
	// 	  newImage: {
	// 			title: this.state.newImage.description,
	// 			description: this.state.newImage.description,
	// 			image_url: result.filesUploaded[0].url
	// 		}
	// 	})
	// 	this.props.dispatch({
	// 	  type: 'ADD_IMAGE',
	// 	  payload: this.state.newImage
	// 	})
	// static propTypes = {
	// 	apikey: PropTypes.string.isRequired,
	// 	 };

	// }
	// FOR FUTURE RELEASE////////////////////////////

	handleAlertClose = (arg) => {
		console.log('snackbar has closed', arg);
		this.setState({
			openAlert: false
		});
	};

	render() {
		let totalExpensePrice = 0;
		console.log('all items check for total', this.props.reduxState);
		console.log('HEY-oooo expense render state and props', this.state, this.props);
		let content = null;
		// const {AsrGxIEK3SGqjQA3OgxDXz}  = this.props;   FUTURE RELEASE
		if (this.props.user.userName) {
			const actions = [ <FlatButton label="Close" primary={true} onClick={this.handleCloseAlert} /> ];

			const editActions = [
				<FlatButton label="Close" primary={true} onClick={this.handleClose} />,
				<FlatButton label="Submit" primary={true} onClick={this.handleOnSubmit} />
			];

			//MAP OVER REDUX STATE.
			const tableRows = this.props.reduxState.map((row) => {
				//.MAP SEPARATES DATA INTO INDIVIDUAL ITEMS.
				const { id, item_description, purchase_date, item_price, item_link } = row;
				totalExpensePrice += parseInt(item_price);
				return (
					// TABLE ROWS //
					<TableRow selectable={false} key={id}>
						<TableRowColumn className="descript">{item_description}</TableRowColumn>
						<TableRowColumn>{purchase_date}</TableRowColumn>
						<TableRowColumn id="count-me">${item_price}</TableRowColumn>
						<TableRowColumn>
							<a href={item_link}>{item_link}</a>
						</TableRowColumn>
						{/* <TableRowColumn> */}

						{/* FOR FUTURE RELEASE */}
						{/* <ReactFilestack
							apikey={'AsrGxIEK3SGqjQA3OgxDXz'}
							options={options}
							onSuccess={this.yourCallbackFunction}
							link
							/>
							FOR FUTURE RELEASE

           */}

						{/* </TableRowColumn> */}
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
						<TextField
							inputStyle={{ color: 'whiteSmoke' }}
							floatingLabelText="Enter description"
							floatingLabelStyle={{ color: 'whitesmoke' }}
							onChange={this.handleChange('item_description')}
							hintStyle={{ color: 'whitesmoke' }}
							inputStyle={{ textAlign: 'center', color: 'whitesmoke' }}
						/>
						{/* type="text"
							id="fname"
							name="desc"
							placeholder="Item description"
							onChange={this.handleChange('item_description')}
						/> */}

						<br />
						<br />

						<DateSelect
							hintText="Purchase date"
							value={this.state.purchase_date}
							onChange={this.handleDatePicker}
						/>
						<br />

						<br />

						<TextField
							inputStyle={{ color: 'whiteSmoke' }}
							floatingLabelText="Item price"
							floatingLabelStyle={{ color: 'whitesmoke' }}
							onChange={this.handleChange('item_price')}
							hintStyle={{ color: 'whitesmoke' }}
							inputStyle={{ textAlign: 'center', color: 'whitesmoke' }}
						/>

						<br />
						<TextField
							inputStyle={{ color: 'whiteSmoke' }}
							floatingLabelText="Item link"
							floatingLabelStyle={{ color: 'whitesmoke' }}
							onChange={this.handleChange('item_link')}
							hintStyle={{ color: 'whitesmoke' }}
							inputStyle={{ textAlign: 'center', color: 'whitesmoke' }}
						/>
						<br />

						{/* END FORM */}

						{/* FORM SUBMIT BUTTON */}
						<div>
							<RaisedButton
								id="expSubmit"
								label="Submit Expense"
								primary={true}
								style={style}
								onClick={this.handleClick}
							/>
						</div>
						{/* TABLE TOTAL KEEPS CURRENT TOTAL OF PRICE COLOUMN */}

						<h3>Total Expenses</h3>

						<h1>${totalExpensePrice}</h1>
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
								{/* <TableHeaderColumn>Image Upload</TableHeaderColumn> */}
								<TableHeaderColumn>Edit entry</TableHeaderColumn>
								<TableHeaderColumn>Delete entry</TableHeaderColumn>
							</TableRow>
						</TableHeader>

						<TableBody>{tableRows}</TableBody>
					</Table>
					{/* <Snackbar
						open={this.state.openSnackbar}
						message={this.state.snackbarText[this.state.actionType]}
						autoHideDuration={4000}
						onRequestClose={this.handleSnackbarClose}
						/> */}

					<div>
						<Dialog
							actions={actions}
							modal={false}
							open={this.state.openAlert}
							onRequestClose={this.handleClose}
						>
							{this.state.alertText[this.state.actionType]}
						</Dialog>
					</div>

					{/* //SECTION FOR UPDATING ITEMS// */}
					<div>
						<Dialog
							title={`Change Item info for ${this.state.currentRow.item_description}???`}
							actions={editActions}
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
								hintText="Purchase date"
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
