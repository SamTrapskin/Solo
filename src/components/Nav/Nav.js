import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
// import Button from 'material-ui/Button';

const Nav = () => (

<div className="topnav" id="myTopnav">
  <a className="topnav a.active" href="/home">Home</a>
  <a className="topnav a.active" href="/expenses">Expenses</a>
  <a className="topnav a.active" href="/mileage">Mileage</a>
  <a className="topnav a.active" href="/home" id="navLogout">Log out</a>
  <a className="topnav a.active" href="javascript:void(0);" class="icon" onClick="myFunction()">#00B0D1;</a>

</div>
);

export default Nav;




