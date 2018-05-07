import React, { Component } from 'react';
import { connect } from 'react-redux';
// import MileageItemList from '/MileageTable';
import Nav from '../../components/Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import ReactTable from "react-table";
import 'react-table/react-table.css';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';
// import AsyncValidationTable from './AsyncValidationTable';

import TextField from 'material-ui/TextField';

const style = {
	margin: 12
};





class InfoPage extends Component {

  constructor(props) {
		super(props);

  }
  
   componentDidMount() {
    this.props.dispatch({type: USER_ACTIONS.FETCH_USER});
    this.props.dispatch({type: 'GET_MILEAGE'})

  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('home');
    }
  }

  handleChange = (name) => {
		return (event) => {
			this.setState({
				[name]: event.target.value
			});
		};
	};

  handleClick = () => {
    console.log('add ... mileage', this.state)
		this.props.dispatch({
			type: 'ADD_MILEAGE',
			payload: this.state
		});
	};

  render() {
    // <AsyncValidationTable onSubmit={MileageTableList} />
    console.log('mileage render', this.state)
    let content = null;
    // let mileageItemList = this.state.getMileage.map((item) => {
    //   return(<MileageItemList key={item.description} item={item} getMileage={this.getMileage}/>)
    // })
      const tableRows = this.props.reduxState.map(row => {
      const {description, address, travel_date, total_miles} = row;
      })

    if (this.props.user.userName) {
      const tableRows = this.props.reduxState.map(row => {
        const {description, address, travel_date, total_miles} = row;
       
      return (
        <TableRow>
        <TableRowColumn>{description}</TableRowColumn>
        <TableRowColumn>{address}</TableRowColumn>
        <TableRowColumn>{travel_date}</TableRowColumn>                     
         <TableRowColumn>{total_miles}</TableRowColumn>

      </TableRow>
      )
    })
        
      content = (
        <div className="column left">
  <form id="expenseForm">
          <label for="fname">Item Description</label>
          <input type="text" id="fname" name="fname" onChange={this.handleChange('item_description')}/>
          
          <br />
          
          <br />
          <label for="lname">Item Link</label>
          <input type="text" id="lname" name="lname" onChange={this.handleChange('item_price')}/>
          <br />
          <label for="lname">Item Price</label>
          <input type="text" id="lname" name="lname" onChange={this.handleChange('item_Link')} />
          <br />
          <RaisedButton label="Add Expense" primary={true} style={style} onClick={this.handleClick}/>
        </form>
        <br />
         
          
          <Table className="column middle">
                  <TableHeader>
          <TableRow>
        <TableHeaderColumn>Trip description</TableHeaderColumn>
        <TableHeaderColumn>Trip Address</TableHeaderColumn>
        <TableHeaderColumn>Date of travel</TableHeaderColumn>
        <TableHeaderColumn>Total miles</TableHeaderColumn>

          </TableRow>
          </TableHeader>
              
                  <TableBody>
                    
                  
							    {tableRows}
              </TableBody>
            </Table>
          
            
            </div>
     )
    
    
      

      
        
        //  <TextField
				// 		hintText="Trip Description"
				// 		underlineFocusStyle={styles.underlineStyle}
				// 		onChange={this.handleChange('description')}
				// 	/>
				// 	<TextField
				// 		hintText="Client Address"
				// 		underlineFocusStyle={styles.underlineStyle}
				// 		onChange={this.handleChange('address')}
				// 	/>

					
				// 	<TextField
				// 		hintText="Date of Travel"
				// 		underlineFocusStyle={styles.underlineStyle}
				// 		onChange={this.handleChange('travel_date')}
				// 	/>
				// 	<TextField
				// 		hintText="Total Miles"
				// 		underlineFocusStyle={styles.underlineStyle}
				// 		onChange={this.handleChange('total_miles')}
				// 	/>
                      
                    
  }        
     
    return (
      <div>
          <Nav />
        { content }
      </div>
    );
  }     
}

const mapStateToProps = state => ({
  user: state.user,
  reduxState: state.getMileage
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(InfoPage);
