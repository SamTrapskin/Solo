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
import DateSelect from '../DateSelect/DateSelect';
import moment from 'moment';
import ExpenseForm from '../ExpenseForm/ExpenseForm';
import MileageForm from '../../MileageForm/MileageForm';
//STYLE VARIABLE BOR MATERIAL BUTTON

const style = {
	margin: 12
};


const mapStateToProps = state => ({
  user: state.user,
  reduxState: state.getMileage
});

class MileageTable extends Component {

    constructor(props) {
      super(props);

      this.state = {
        open: false,
        getMileage: [],
        currentRow: {},
        openAlert: false,
        alertText: {
          add: 'You have added a new expense successfully!',
          delete: 'You have deleted the expense!'
        }

    }

  }
    isSelected = (index) => {
      return this.state.selected.indexOf(index) !== -1;
    };
  //   this.state = {
  //     controlledDate: null,
  //   };
  // }
  
  
  //on page load, DISPATCH GET_Mileage is
	//dispatched TO mileageSaga which then
	//goes to getMileageReducer and appends MILEAGE_DATA to the
	//DOM
  
  	//SETS STATE FOR ALL INPUTS

  // handleDateChange = (date) => {
  //   return (event => {
  //     this.setState({
  //       controlledDate: date,
  //     });
  //   });
  // };



  handleOpen = () => {
		this.setState({ open: true });
	};

	handleClose = () => {
		this.setState({ open: false });
  };
  
  handleCloseAlert = () => {
		this.setState({ openAlert: false });
	};
 
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.dispatch({type: USER_ACTIONS.FETCH_USER});
    this.props.dispatch({type: 'GET_MILEAGE'})

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
		  controlledDate: date,
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
  

  	handleDatePicker = (date) => {
		date = moment(date).format('MM/DD/YYYY');
		console.log('handling date change', date);
		this.setState((prevState) => ({
			currentRow: {
				...prevState.currentRow,
				travel_date: date
			},
			travel_date: date,
			actionType: 'date'
		}));
	};

    	//SUBMIT BUTTON- TRIGGERS DISPATCH TO EXPENSE SAGA TO ADD DATA

  handleClick = () => {
    console.log('add ... mileage', this.state)
    this.setState({
			actionType: 'add'
		});
		this.props.dispatch({
			type: 'ADD_MILEAGE',
			payload: this.state
    });

    this.setState({
			openAlert: true
		});
  };
  
  handleClickRemove = (id) => {
    console.log('delete mileage', this.state);
    this.setState({
			actionType: 'delete'
		});

		this.props.dispatch({
			type: 'DELETE_MILEAGE',
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
		console.log('edit mileage', this.state);
		this.props.dispatch({
			type: 'EDIT_DESCR',
			payload: this.state
		});
  };
  
  handleOnSubmit = () => {
		console.log('update mileage', this.state);
		

		this.props.dispatch({
			type: 'UPDATE_MILEAGE',
			payload: this.state.currentRow
		});

		this.handleClose();
	};
  
  handleAlertClose = (arg) => {
		console.log('snackbar has closed', arg);
		this.setState({
			openAlert: false
		});
	};

  render() {
    let totalMileage = 0;
    console.log('mileage render', this.state)
    let content = null;
    if (this.props.user.userName) {
      const actions = [
         <FlatButton label="Close" primary={true} onClick={this.handleCloseAlert} /> ];
      const editActions = [
				<FlatButton label="Close" primary={true} onClick={this.handleClose} />,
				<FlatButton label="Submit" primary={true} onClick={this.handleOnSubmit} />
			];


      //MAP OVER REDUX STATE. 
      const tableRows = this.props.reduxState.map(row => {

      //.MAP SEPARATES DATA INTO INDIVIDUAL ITEMS.
      const { id, description, address, travel_date, total_miles} = row;
      totalMileage += parseInt(total_miles)
      return (
        <TableRow selectable={false} key={id}>
        {/* TABLE ROWS */}
        
        
        <TableRowColumn>{description}</TableRowColumn>
        <TableRowColumn>{address}</TableRowColumn>
        <TableRowColumn>{travel_date}</TableRowColumn>                     
         <TableRowColumn>{total_miles}</TableRowColumn>
         <TableRowColumn><EditIcon onClick={() => {
                  this.handleClickEdit(row);
                }}
                
              />
         
         
         </TableRowColumn>
         <TableRowColumn><TrashIcon onClick={() => {this.handleClickRemove(id);
						}}/>
      </TableRowColumn>
      </TableRow>

       //END TABLE ROWS 
      );
    });
        
      content = (
        <div>   
        {/* FORM FOR ADDING EXPENSES(DATA) */}
    
				<MileageForm />

          {/* TABLE HEADERS */}
            <Table className="column middle">
                  <TableHeader>
          <TableRow>
        <TableHeaderColumn>Trip description</TableHeaderColumn>
        <TableHeaderColumn>Trip Address</TableHeaderColumn>
        <TableHeaderColumn>Date of travel</TableHeaderColumn>
        <TableHeaderColumn>Total miles</TableHeaderColumn>
        <TableHeaderColumn>Edit entry</TableHeaderColumn>
				<TableHeaderColumn>Delete entry</TableHeaderColumn>
          </TableRow>
          </TableHeader>
              
                  <TableBody>
                    
                  
							    {tableRows}
              </TableBody>
            </Table>

          {/* //SECTION FOR UPDATING ITEMS// */}
          


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
					<div>
						<Dialog
							title={`Change Mileage info for ${this.state.currentRow.description}???`}
							actions={editActions}
							modal={true}
							open={this.state.open}
						>
							<TextField
								id="address"
								value={this.state.currentRow.address}
								onChange={(event) => {
									this.setState({
										currentRow: {
											...this.state.currentRow,
											address: event.target.value
										}
									});
								}}
								hintText="Address"
							/>
							<TextField
                id="travel_date"
								value={this.state.currentRow.travel_date}
								onChange={(event) => {
									this.setState({
										currentRow: {
											...this.state.currentRow,
											purchase_date: event.target.value
										}
									});
								}}
								hintText="Travel Date"
							/>
							<TextField
								id="total_miles"
								value={this.state.currentRow.total_miles}
								onChange={(event) => {
									this.setState({
										currentRow: {
											...this.state.currentRow,
											total_miles: event.target.value
										}
									});
								}}
								hintText="Total miles"
							/>
						</Dialog>
					</div>
					{/* //END SECTION FOR UPDATING ITEMS// */}
          
            
            </div>
     )
    }        
     
    return (
      <div>
          <Nav />
        { content }
      </div>
    );
  }     
}



// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(MileageTable);
