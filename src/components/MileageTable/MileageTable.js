import React, { Component } from 'react';
import { connect } from 'react-redux';
// import MileageItemList from '/MileageTable';
import Nav from '../../components/Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import ReactTable from "react-table";
import 'react-table/react-table.css';

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
    console.log('mileage render', this.state)
    let content = null;
    // let mileageItemList = this.state.getMileage.map((item) => {
    //   return(<MileageItemList key={item.description} item={item} getMileage={this.getMileage}/>)
    // })

    if (this.props.user.userName) {
      const tableRows = this.props.reduxState.map(row => {
        const {description, address, travel_date, total_miles} = row;
        return (<tr className="Awesome">
                  <td>{description}</td>
                  <td>{address}</td>
                  <td>{travel_date}</td>
                  <td>{total_miles}</td>
                </tr>
                );
      });

      content = (
        <div>
        
        {/* <TextField
						hintText="Trip Description"
						underlineFocusStyle={styles.underlineStyle}
						onChange={this.handleChange('description')}
					/>
					<TextField
						hintText="Client Address"
						underlineFocusStyle={styles.underlineStyle}
						onChange={this.handleChange('address')}
					/>

					
					<TextField
						hintText="Date of Travel"
						underlineFocusStyle={styles.underlineStyle}
						onChange={this.handleChange('travel_date')}
					/>
					<TextField
						hintText="Total Miles"
						underlineFocusStyle={styles.underlineStyle}
						onChange={this.handleChange('total_miles')}
					/>
        
      
 */}


          <table className="Awesome">
          <tbody>
            <tr>
              <th>Trip Description</th>
              <th>Trip Address</th>
              <th>Date of Trip</th>
              <th>Total Miles</th>
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
