import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from '../../components/Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import { triggerLogout } from '../../redux/actions/loginActions';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
import EditIcon from 'material-ui/svg-icons/image/edit';
import TrashIcon from 'material-ui/svg-icons/action/delete';

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
        getMileage: []
      };
    }
    
  //   this.state = {
  //     controlledDate: null,
  //   };
  // }
  
  
  //on page load, DISPATCH GET_Mileage is
	//dispatched TO mileageSaga which then
	//goes to getMileageReducer and appends MILEAGE_DATA to the
	//DOM
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

  	//SETS STATE FOR ALL INPUTS

  // handleDateChange = (date) => {
  //   return (event => {
  //     this.setState({
  //       controlledDate: date,
  //     });
  //   });
  // };

 
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
  
  

  render() {
    // <AsyncValidationTable onSubmit={MileageTableList} />
    console.log('mileage render', this.state)
    let content = null;
    if (this.props.user.userName) {

      //MAP OVER REDUX STATE. 
      const tableRows = this.props.reduxState.map(row => {

      //.MAP SEPARATES DATA INTO INDIVIDUAL ITEMS.
      const { id, description, address, travel_date, total_miles} = row;
      return (
        <TableRow selectable={false}>
        {/* TABLE ROWS */}
        
        
        <TableRowColumn>{description}</TableRowColumn>
        <TableRowColumn>{address}</TableRowColumn>
        <TableRowColumn>{travel_date}</TableRowColumn>                     
         <TableRowColumn>{total_miles}</TableRowColumn>
         <TableRowColumn><EditIcon /></TableRowColumn>
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
