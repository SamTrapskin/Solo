import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../../styles/main.css';
import Nav from '../../components/Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import { triggerLogout } from '../../redux/actions/loginActions';
import ExpenseTableList from '../ExpenseTable/ExpenseTable';
import moment from 'moment';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import PropTypes from 'prop-types';


const style = {
  margin: 12,
};


const mapStateToProps = (state) => ({
	user: state.user,
	reduxState: state.getExpense
});


class UserPage extends Component {
	constructor(props) {
		super(props);

		// this.state = {
		// 	getExpense: []
		// };
		// this.clickHandler = this.clickHandler.bind(this);
	}

	componentDidMount() {
		this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
		this.props.dispatch({ type: 'GET_EXPENSE' });
		//on page load, GET_EXPENSE is
		//SENT TO expenseSaga which then
		//goes to getExpenseReducer and appended to the
		//DOM
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

	handleChange = (name) => {
		return (event) => {
			this.setState({
				[name]: event.target.value
			});
		};
	};

	handleClick = () => {
		console.log('add expense', this.state);
		this.props.dispatch({
			type: 'ADD_EXPENSE',
			payload: this.state
		});
	};

	clickHandler = () => {
		console.log('delete expense', this.state);
		this.props.dispatch({
			type: 'DELETE_EXPENSE',
			payload: 1 //req.params.id
		});
	};
	render() {
		console.log('HEY-oooo expense render', this.state);

		let content = null;

		if (this.props.user.userName) {
			const tableRows = this.props.reduxState.map((row) => {
				const { item_description, purchase_date, item_price, item_link } = row;
				return (
					<tr>
						<td>{item_description}</td>
						<td>{purchase_date}</td>
						<td>{item_price}</td>
						<td>{item_link}</td>
					</tr>
				);
			});

			content = (
        
            <div>
                      
         )
         
            

          <RaisedButton label="Primary" primary={true} style={style} onClick={this.handleClick}/>
          

				
       
  
  
       
					<button onClick={this.logout}>Log Out</button>
					<button onClick={this.clickHandler}>DELETE</button>

					<table className="Awesome">
						<tbody>
							<tr>
								<th>Item Description</th>
								<th>Date of purchase</th>
								<th>Item Price</th>
								<th>Link to item</th>
							</tr>
							{ExpenseTableList}
							{tableRows}
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
