
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import Header from './components/Header/Header';
import LoginPage from './components/LoginPage/LoginPage';
import RegisterPage from './components/RegisterPage/RegisterPage';
import ExpenseTable from './components/ExpenseTable/ExpenseTable';
import MileageTable from './components/MileageTable/MileageTable';

import './styles/main.css';

const App = () => (
  <div>
    <Header>   <img id="logo" src="https://i.imgur.com/yVY9G3n.png" alt="EXPENSUR"/>
 </Header>
    <Router>
       <Switch>
        <Route
          path="/login"
          component={LoginPage}
        /> 
        
        <Route
          path="/register"
          component={RegisterPage}
        />
        <Route
          path="/expenses"
          component={ExpenseTable}
        />
        <Route
          path="/mileage"
          component={MileageTable}
        />
       OTHERWISE (no path!)
        <Route render={() => <h1>404</h1>} />

       </Switch> 
    </Router>
  </div>
);

export default App;

