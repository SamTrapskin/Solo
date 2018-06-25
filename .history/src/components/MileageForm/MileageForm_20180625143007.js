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

class MileageForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			open: false,
			getMileage: [],
			currentRow: {},
			openAlert: false,
			actionType: '',
			alertText: {
				add: 'You have added mileage successfully!',
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
		console.log('add mileage', this.state);
		this.setState({
			actionType: 'add'
		});
		this.props.dispatch({
			type: 'ADD_MILEAGE',
			payload: this.state
		});
		
			this.setState({
				name: ''
			})
		

		this.setState({
			openAlert: true
		});
    };
    

    render() {
        let totalMileage = 0;
            let content = null;

        //.MAP SEPARATES DATA INTO INDIVIDUAL ITEMS.
			

        if (this.props.user.userName) {
			const actions = [ <FlatButton label="Close" primary={true} onClick={this.handleCloseAlert} /> ];
        
            const tableRows = this.props.reduxState.map((row) => {
                const { id, trip_description, trip_address, travel_date, total_miles } = row;
				totalMileage += parseInt(total_miles);
		})
                return (
                       <div>
					   <form id="MileageForm">
						<h3>
							Add new <br />
							trip
						</h3>
						<TextField
							inputStyle={{ color: 'whiteSmoke' }}
							floatingLabelText="Trip description"
							floatingLabelStyle={{ color: 'whitesmoke' }}
							onChange={this.handleChange('trip_description')}
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
                        <TextField
							inputStyle={{ color: 'whiteSmoke' }}
							floatingLabelText="Trip address"
							floatingLabelStyle={{ color: 'whitesmoke' }}
							onChange={this.handleChange('trip_address')}
							hintStyle={{ color: 'whitesmoke' }}
							inputStyle={{ textAlign: 'center', color: 'whitesmoke' }}
						/>

						<br />
						<br />

						<DateSelect
							hintText="Travel date"
							value={this.state.purchase_date}
							onChange={this.handleDatePicker}
						/>
						<br />

						<br />

						<TextField
							inputStyle={{ color: 'whiteSmoke' }}
							floatingLabelText="Total price"
							floatingLabelStyle={{ color: 'whitesmoke' }}
							onChange={this.handleChange('total_miles')}
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
						
						<RaisedButton
								id="expSubmit"
								label="Submit Expense"
								primary={true}
								style={style}
								onClick={this.handleClick} 
							/>
                   

                        {/* END FORM */}
                        <h3>Total Mileage</h3>

                        <h1>${totalMileage}</h1>

					
                        </form>
					
						
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
export default connect(mapStateToProps)(MileageForm);

