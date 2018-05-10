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
        currentRow: {}
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

    	//SUBMIT BUTTON- TRIGGERS DISPATCH TO EXPENSE SAGA TO ADD DATA

  handleClick = () => {
    console.log('add ... mileage', this.state)
		this.props.dispatch({
			type: 'ADD_MILEAGE',
			payload: this.state
		});
  };
  
  handleClickRemove = (id) => {
		console.log('delete mileage', this.state);
		this.props.dispatch({
			type: 'DELETE_MILEAGE',
			payload: id
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
  

  render() {
    // <AsyncValidationTable onSubmit={MileageTableList} />
    console.log('mileage render', this.state)
    let content = null;
    if (this.props.user.userName) {
      const actions = [
				<FlatButton label="Cancel" primary={true} onClick={this.handleClose} />,
				<FlatButton label="Submit" primary={true} onClick={this.handleOnSubmit} />
			];


      //MAP OVER REDUX STATE. 
      const tableRows = this.props.reduxState.map(row => {

      //.MAP SEPARATES DATA INTO INDIVIDUAL ITEMS.
      const { id, description, address, travel_date, total_miles} = row;
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
    
        <form id="mileageForm">
        <h3>Add a new <br />
            mileage
        </h3>
          <input type="text" id="fname" name="fname" placeholder ="Trip description" onChange={this.handleChange('description')}/>
          
          <br />
          {/* <DatePicker
        hintText="Travel date"
         value={this.state.controlledDate}
        onChange={this.handleDateChange('controlledDate')}
      /> */}
          <br />
          <input type="text" id="lname" name="lname" placeholder ="Address" onChange={this.handleChange('address')}/>
          <br />
          <input type="text" id="lname" name="lname" placeholder ="Total miles" onChange={this.handleChange('total_miles')} />
          <br />

        {/* END FORM */}


          <RaisedButton id='expSubmit' label="Submit Mileage" primary={true} style={style} onClick={this.handleClick}/>
       

            {/* TABLE TOTAL KEEPS CURRENT TOTAL OF PRICE COLOUMN */}
          <h1>Total:</h1>
                 <br/> 
                  <h3>$748.93</h3>
                  </form>

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
							title={`Change Mileage info for ${this.state.currentRow.description}???`}
							actions={actions}
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
