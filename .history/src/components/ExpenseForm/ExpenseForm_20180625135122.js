import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from '../../components/Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import { triggerLogout } from '../../redux/actions/loginActions';
import ExpenseTable from '../ExpenseTable/ExpenseTable';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import moment from 'moment';
import DateSelect from '../DateSelect/DateSelect';
import RaisedButton from 'material-ui/RaisedButton';



//STYLE VARIABLE FOR MATERIAL BUTTON
const style = {
	margin: 12
	//
};

const mapStateToProps = (state) => ({
	user: state.user,
	reduxState: state.getExpense
});

class ExpenseForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			open: false,
			getExpense: [],
			currentRow: {},
			openAlert: false,
			actionType: '',
			inputVal: props.inputValue,
			alertText: {
				add: 'You have added a new expense successfully!',
			}
        };
    }
        
		resetForm = () => {
		this.setState(this.baseState)
	  }
	  submitForm = () => {
		// submit the form logic
	  }
	  updateInput = val => this.setState({ inputVal: val })

        handleOpen = () => {
            this.setState({ open: true });
        };
    
        handleClose = () => {
            this.setState({ open: false });
        };
    
        handleCloseAlert = () => {
            this.setState({ openAlert: false });
        };


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
		this.formRef.reset();
    };
    

    render() {
        let totalExpensePrice = 0;
            let content = null;

        //.MAP SEPARATES DATA INTO INDIVIDUAL ITEMS.
			

        if (this.props.user.userName) {
			const actions = [ <FlatButton label="Close" primary={true} onClick={this.handleCloseAlert} /> ];
        
            const tableRows = this.props.reduxState.map((row) => {
                const { id, item_description, purchase_date, item_price, item_link } = row;
				totalExpensePrice += parseInt(item_price);
		})
                return (
                       <div>
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
                        <h3>Total Expenses</h3>

                        <h1>${totalExpensePrice}</h1>
                   
                        </form>
					
							<RaisedButton
								id="expSubmit"
								label="Submit Expense"
								primary={true}
								style={style}
								onClick={this.handleClick}, {this.resetForm}
							/>
                       {/* TABLE TOTAL KEEPS CURRENT TOTAL OF PRICE COLOUMN */}
                        </div>
                )   
 
            }
		
        

            
             
          
        
        
      
    
	 


				return (
					<div>
						<Nav />
					</div>
				);



	}
}

{/* // this allows us to use <App /> in index.js */}
export default connect(mapStateToProps)(ExpenseForm);

