import React, { Component } from 'react';
import { connect } from 'react-redux';
// import MileageItemList from '/MileageTable';
import Nav from '../../components/Nav/Nav';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import ReactTable from "react-table";
import 'react-table/react-table.css'
import { Button } from 'react-bootstrap';



const mapStateToProps = state => ({
  user: state.user,
  reduxState: state.getMileage
});

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

  handleChange = (event) => {
		this.setState({
      getMileage: event.target.value
      
		});
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
      content = (
        <div>
          <p>
            MILEAGE Page
          </p>
        
      
      <input type='text' placeholder= "Trip Description" onChange={this.handleChange}/>

      <Button onClick={this.handleClick} bsStyle="primary" bsSize="large" active>
						Add Mileage
					</Button>
          <table className="Awesome">
          <tbody>
            <tr>
              <th>Trip Description</th>
              <th>Trip Address</th>
              <th>Date of Trip</th>
              <th>Total Miles</th>

            </tr>

            <tr>
            </tr>
            <tr>
              {JSON.stringify(this.props.reduxState)}
            </tr>
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

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(InfoPage);
