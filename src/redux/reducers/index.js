import { combineReducers } from 'redux';
import user from './userReducer';
import expense from "./expenseReducer";   
import login from './loginReducer';
import getExpense from './getExpenseReducer'
const store = combineReducers({
  user,
  login,
  expense,
  getExpense
});

export default store;
