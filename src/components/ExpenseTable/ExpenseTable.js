import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../../styles/main.css';
import Nav from '../../components/Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import { triggerLogout } from '../../redux/actions/loginActions';
import { FormControl } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import moment from 'moment';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn,} 
from 'material-ui/Table';
//

const mapStateToProps = (state) => ({
	user: state.user,
	reduxState: state
});

class UserPage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			getExpense: [],
		};
	 }
 
	componentDidMount() {
		this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
    this.props.dispatch({type: 'GET_EXPENSE'})
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
	handleChange = (event) => {
		this.setState({
      getExpense: event.target.value
      
		});
	};

	handleClick = () => {
    console.log('add expense', this.state)
		this.props.dispatch({
			type: 'ADD_EXPENSE',
			payload: this.state
		});
	};

  clickHandler = () =>{
    this.deleteItem();
  };





	render() {
    console.log('HEY-oooo', this.state)
		// let getExpense = this.props.getExpense.map((item) => {
    //   return (
    //     <div key={item.item_description}>{item.purchase_date}{item.price}{item.item_link}</div>
    //   )
    // });
		// let expenseList = this.props.getExpense.map((item) => {
		//   return(<getExpense key={item.id} item={item} getExpenseInfo={this.getExpenseInfo}/>)
    // })
    
    let content = null;

		if (this.props.user.userName) {
			content = (
				<div>
					<h1 id="welcome">Welcome, {this.props.user.userName}!</h1>

					{/* EXPENSE TABLE INPUTS */}

					{/* <FormControl
						type="text"
						placeholder="Item"
						input
						value={this.state.newDescription}
						onChange={this.handleChange}
					/> */}
					
          <input type='text' placeholder= "Item Description" onChange={this.handleChange}/>

					<p>{moment().format('MMMM Do YYYY, h:mm:ss a')}</p>

					<Button onClick={this.handleClick} bsStyle="primary" bsSize="large" active>
						Add Item
					</Button>

					{/* END EXPENSE TABLE INPUTS */}
          {/* {JSON.stringify(this.props.reduxState)} */}
       
					<button onClick={this.logout}>Log Out</button>
          <button onClick={this.clickHandler}>DELETE</button>
					 <table className="Awesome">
						<tbody>
							<tr>
								<th>Temporary header</th>
								<th>Temporary header 2</th>
								<th>Temporary header 3</th>
							</tr>

							<tr>
								 {/* {this.state.getExpense} */}
							</tr>
							<tr>
								{JSON.stringify(this.props.reduxState)}
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
