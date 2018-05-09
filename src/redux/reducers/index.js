import { combineReducers } from 'redux';
import user from './userReducer';
import expense from "./expenseReducer"; 
import mileage from "./mileageReducer";  
import login from './loginReducer';
import getExpense from './getExpenseReducer';
import getMileage from './getMileageReducer';
const store = combineReducers({
  user,
  login,
  expense,
  getExpense,
  mileage,
  getMileage
});

export default store;