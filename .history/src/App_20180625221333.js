
import React from 'react';
import './styles/main.css';


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


const App = () => (
  <div>
    <Header id="top">   
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
       <Route
          path="/home"
          component={MileageTable}
        />

       </Switch> 
    </Router>
  </div>
);

export default App;

