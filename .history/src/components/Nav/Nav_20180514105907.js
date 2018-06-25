import React from 'react';
import LoginPage from '../LoginPage/LoginPage';

const Nav = () => (

<div className="topnav" id="myTopnav">
  <a className="topnav a.active" href="/login">Log In</a>
 
  <a className="topnav a.active" href="/expenses">Expenses</a>
  <a className="topnav a.active" href="/mileage">Mileage</a>
  <a className="topnav a.active" href="/login" id="navLogout">Log out</a>

</div>
);

export default Nav;




