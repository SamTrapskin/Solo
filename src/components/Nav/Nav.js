import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
// import Button from 'material-ui/Button';
import Tabs, { Tab } from 'material-ui/Tabs';


const Nav = () => (

  <div className="navbar">
    <div>
      <ul>
        <li>
        <Link to="/expenses">
           Expense Table
          </Link>
        </li>
        
        <li>
          <Link to="/mileage">
            Mileage Table
          </Link>
        </li>
       <div id="navLogout">
        <li onClick={this.logout}>
          <Link to="/home" >
          Log Out
          </Link>
        </li>
        </div>
      </ul>
    </div>
  </div>
);

export default Nav;


