import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../../styles/main.css';
import Nav from '../../components/Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import { triggerLogout } from '../../redux/actions/loginActions';
import ExpenseTableList from '../ExpenseTable/ExpenseTable';
import { FormControl } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import moment from 'moment';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn,} 
from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
//

class UserPage extends Component {
	constructor(props) {
		super(props);
    this.state= {
      getExpense: []
    }

    this.clickHandler = this.clickHandler.bind(this);
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

  clickHandler = () => {
    console.log('delete expense', this.state)
    this.props.dispatch({
      type:'DELETE_EXPENSE',
      payload: 1//req.params.id
    });
  };

	render() {
    console.log('HEY-oooo expense render')
    
		// let getExpense = this.props.getExpense.map((item) => {
    //   return (
    //     <div key={item.item_description}>{item.purchase_date}{item.price}{item.item_link}</div>
    //   )
    // });
		// let expenseList = this.props.getExpense.map((item) => {
		//   return(<getExpense key={item.id} item={item} getExpenseInfo={this.getExpenseInfo}/>)
    // })
    
    let content = null;
    // let expenseTableList = this.props.data.map((item) => {
    //   return(<ExpenseTableList key={item.id} item={item} data={this.data}/>)
    // })
		if (this.props.user.userName) {
      const tableRows = this.props.reduxState.map(row => {
        const {item_description, purchase_date, item_price, item_link} = row;
        return (<tr>
                  <td>{item_description}</td>
                  <td>{purchase_date}</td>
                  <td>{item_price}</td>
                  <td>{item_link}</td>
                </tr>
                );
      });

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

					<Button onClick={this.handleClick} bsStyle="primary" bsSize="large" active>
						Add Item
					</Button>

					{/* END EXPENSE TABLE INPUTS */}
          {/* {JSON.stringify(this.props.reduxState)} */}
       
					<button onClick={this.logout}>Log Out</button>
          <button onClick={this.clickHandler}>DELETE</button>

          {ExpenseTableList}

          <RaisedButton label="Secondary" secondary={true} style={{margin: 12}} />
					 <table className="Awesome">
						<tbody>
							<tr>
								<th>Item Description</th>
								<th>Date of purchase</th>
								<th>Item Price</th>
                <th>Link to item</th>
							</tr>

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

const mapStateToProps = (state) => ({
	user: state.user,
  reduxState: state.getExpense
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(UserPage);
