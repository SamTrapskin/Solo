import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';






const mapStateToProps = state => ({
  user: state.user,
  login: state.login,
});

class LandingPage extends Component {
  
  constructor(props) {
    super(props);
      this.state = {open: false};
    }

   
  
  componentDidMount() {
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user.userName) {
      this.props.history.push('/expenses');
    }
  }
 clickHandler
  

  handleToggle = () => this.setState({open: !this.state.open});


  render() {
    let year1 = '2018';
    return (
      <div>
                    <img id="landingPage" src="https://i.imgur.com/F2TvfJr.jpg" alt="Woman_working on couch" />
                    
                      <h1>Go to Expenses</h1>
                      <div id="toggle">
        <RaisedButton 
          label="Open expenses"
          onClick={this.handleToggle}
        />
        <Drawer open={this.state.open}>
          <MenuItem>2018 Expenses   <a className="topnav a.active" href="/expenses">Expenses</a>
</MenuItem>
          <MenuItem>2018 Mileage</MenuItem>

          <br/>
          <MenuItem>2017 Expenses</MenuItem>
          <MenuItem>2017 Mileage</MenuItem>

          <br/>
          <MenuItem>2016 Expenses</MenuItem>
          <MenuItem>2016 Mileage</MenuItem>

          <br/>
          <MenuItem>2015 Expenses</MenuItem>
          <MenuItem>2015 Mileage</MenuItem>

          <br/>
          <MenuItem>2014 Expenses</MenuItem>
          <MenuItem>2014 Mileage</MenuItem>

        </Drawer>
      </div>
    
    </div>
    );
  }
}

export default connect(mapStateToProps)(LandingPage);
