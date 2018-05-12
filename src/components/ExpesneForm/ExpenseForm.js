// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import Nav from '../../components/Nav/Nav';
// import { USER_ACTIONS } from '../../redux/actions/userActions';
// import { triggerLogout } from '../../redux/actions/loginActions';
// import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
// import RaisedButton from 'material-ui/RaisedButton';

// const mapStateToProps = (state) => ({
// 	user: state.user,
// 	reduxState: state.getExpense
// });

// class ExpenseForm extends Component {
// 	constructor(props) {
// 		super(props);
// 	}
// 	handleChange = (name) => {
// 		return (event) => {
// 			this.setState({
// 				[name]: event.target.value
// 			});
// 		};
// 	};

// 	handleClick = () => {
// 		console.log('add expense', this.state);

// 		this.props.dispatch({
// 			type: 'ADD_EXPENSE',
// 			payload: this.state
// 		});
// 	};

// 	render() {
// 		if (this.props.user.userName) {
// 			return (
		

// 		return (
// 			<div>
// 				<Nav />
// 				{content}
// 			</div>
// 		);
// 	}
// }

// export default connect(mapStateToProps)(ExpenseForm);
