import React from 'react';
import { Link } from 'react-router-dom';

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
      </ul>
    </div>
  </div>
);

export default Nav;
