import { combineReducers } from 'redux';
import user from './userReducer';
import login from './loginReducer';
import getExpense from './getExpenseReducer';
import mileage from './mileageReducer';  
import getMileage from './getMileageReducer';
// import image from './imageReducer'     RELEASE 2.0

const store = combineReducers({
  user,
  login,
  expense,
  getExpense,
  mileage,
  getMileage,
  // image     RELEASE 2.0
});

export default store;