import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../../styles/main.css';
import Nav from '../../components/Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import { triggerLogout } from '../../redux/actions/loginActions';
import { FormControl } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import moment from 'moment';

const mapStateToProps = (state) => ({
	user: state.user,
	reduxState: state
});

class UserPage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			newExpense: ''
		};
	}

	componentDidMount() {
		this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
		this.props.dispatch({type: 'GET_EXPENSE'})
	}

	componentDidUpdate() {
		if (!this.props.user.isLoading && this.props.user.userName === null) {
			this.props.history.push('home');
		}
	}
	// getExpenseInfo = () => {
	//   axios.get('/api/expenses').then((response) => {
	//     this.props.dispatch({
	//       type: 'GET_EXPENSE',
	//       payload: response.data
	//     })
	//   }).catch((error) => {
	//       console.log('Error in get', error);
	//   })

	// }

	logout = () => {
		this.props.dispatch(triggerLogout());
		// this.props.history.push('home');
	};
	handleChange = (event) => {
		this.setState({
			newExpense: event.target.value
		});
	};

	handleClick = () => {
    console.log('add expense', this.state)
		this.props.dispatch({
			type: 'ADD_EXPENSE',
			payload: this.state
		});
	};

	render() {
		let content = null;
		// let expenseList = this.props.getExpenseInfo.map((item) => {
		//   return(<ExpenseList key={item.id} item={item} getExpenseInfo={this.getExpenseInfo}/>)
		// })
		if (this.props.user.userName) {
			content = (
				<div>
					<h1 id="welcome">Welcome, {this.props.user.userName}!</h1>

					{/* EXPENSE TABLE INPUTS */}

					<FormControl
						type="text"
						placeholder="Item"
						input
						value={this.state.newExpense}
						onChange={this.handleChange}
					/>
					<FormControl
						type="number"
						placeholder="Item Price"
						input
						value={this.state.newExpense}
						onChange={this.handleChange}
					/>
					<FormControl type="text" placeholder="Item link / notes" onChange={this.handleChange} />
					<p>{moment().format('MMMM Do YYYY, h:mm:ss a')}</p>
					<Button onClick={this.handleClick} bsStyle="primary" bsSize="large" active>
						Add Item
					</Button>

					{/* END EXPENSE TABLE INPUTS */}
          {JSON.stringify(this.props.reduxState)}
					<button onClick={this.logout}>Log Out</button>
					<table className="Awesome">
						<tbody>
							<tr>
								<th>Temporary header</th>
								<th>Temporary header 2</th>
								<th>Temporary header 3</th>
							</tr>

							<tr>
								<td>{this.state.addExpenseinfo}</td>
							</tr>
							<tr>
								<td>{JSON.stringify(this.props.reduxState)}</td>
							</tr>
						</tbody>
					</table>
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
export default connect(mapStateToProps)(UserPage);
