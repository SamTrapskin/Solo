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
import { FormControl } from 'react-bootstrap';

import DatePicker from 'material-ui/DatePicker';




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
    //   controlledDate: null,
    // };
  
	// 	this.state = {
	// 		getExpense: []
	// 	};
	// 	this.clickHandler = this.clickHandler.bind(this);
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
        [name]: event.target.value,
			});
		};
  };
  // handleDateChange = (date) => {
  //   return (event => {
  //     this.setState({
  //       controlledDate: date,
  //     });
  //   });
  // };
 
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
      const tableRows = this.props.reduxState.map(row => {
        const {item_description, purchase_date, item_price, item_link} = row;
				return (
          <TableRow>
          <TableRowColumn>{item_description}</TableRowColumn>
          <TableRowColumn>{purchase_date}</TableRowColumn>
          <TableRowColumn>{item_price}</TableRowColumn>                     
           <TableRowColumn>{item_link}</TableRowColumn>
  
        </TableRow>
        )
      })
          
          content = (
            <div>       
        <form id="expenseForm">
        <h2>Add a new expense</h2>
          <input type="text" id="fname" name="fname" placeholder ="Item description" onChange={this.handleChange('item_description')}/>
          
          <br />
          {/* <DatePicker
        hintText="Date of purchase"
        value={this.state.controlledDate}
        onChange={this.handleDateChange('controlledDate')} */}
      {/* /> */}
          <br />
          <input type="text" id="lname" name="lname" placeholder ="Item price" onChange={this.handleChange('item_price')}/>
          <br />
          <input type="text" id="lname" name="lname" placeholder ="Item link" onChange={this.handleChange('item_link')} />
          <br />
          <RaisedButton id='expSubmit' label="Submit Expense" primary={true} style={style} onClick={this.handleClick}/>
       
       
        <h1>Total:</h1>
                 <br/> 
                  <h3>$748.93</h3>
                  </form>
        
                

                
                   
              
                     
                      <Table>
                              <TableHeader>
                      <TableRow>
                    <TableHeaderColumn>Item description</TableHeaderColumn>
                    <TableHeaderColumn>Purchase Date</TableHeaderColumn>
                    <TableHeaderColumn>Item Price</TableHeaderColumn>
                    <TableHeaderColumn>Item Link</TableHeaderColumn>

                      </TableRow>
                      </TableHeader>
                          
                              <TableBody>
                                
                               
                                {ExpenseTableList}
							                  {tableRows}

                          </TableBody>
                        </Table>
                        
                       
                       
                 
                  </div>
               
 
          )
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
