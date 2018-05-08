import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from '../../components/Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import ReactTable from "react-table";
import 'react-table/react-table.css';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

const style = {
	margin: 12
};





class InfoPage extends Component {

  constructor(props) {
    super(props);
    
  //   this.state = {
  //     controlledDate: null,
  //   };
  // }
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
  handleDateChange = (date) => {
    return (event => {
      this.setState({
        controlledDate: date,
      });
    });
  };

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
    if (this.props.user.userName) {

    // let mileageItemList = this.state.getMileage.map((item) => {
    //   return(<MileageItemList key={item.description} item={item} getMileage={this.getMileage}/>)
    // })
      const tableRows = this.props.reduxState.map(row => {
      const {description, address, travel_date, total_miles} = row;
   

       
      return (
        <TableRow>
        <TableRowColumn>{description}</TableRowColumn>
        <TableRowColumn>{address}</TableRowColumn>
        <TableRowColumn>{travel_date}</TableRowColumn>                     
         <TableRowColumn>{total_miles}</TableRowColumn>

      </TableRow>
      );
    });
        
      content = (
        <div>       
        <form id="mileageForm">
        <h2>Add a new mileage</h2>
          <input type="text" id="fname" name="fname" placeholder ="Trip description" onChange={this.handleChange('description')}/>
          
          <br />
          <DatePicker
        hintText="Travel date"
         value={this.state.controlledDate}
        onChange={this.handleDateChange('controlledDate')}
      />
          <br />
          <input type="text" id="lname" name="lname" placeholder ="Address" onChange={this.handleChange('item_price')}/>
          <br />
          <input type="text" id="lname" name="lname" placeholder ="Total miles" onChange={this.handleChange('item_Link')} />
          <br />
          <RaisedButton id='expSubmit' label="Submit Expense" primary={true} style={style} onClick={this.handleClick}/>
       
       
        <h1>Total:</h1>
                 <br/> 
                  <h3>$748.93</h3>
                  </form>
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
