import { all } from 'redux-saga/effects';
import userSaga from './userSaga';
import loginSaga from './loginSaga';

import expenseSaga from './expenseSaga';
import expenseReducer from '../reducers/expenseReducer';



export default function* rootSaga() {
  yield all([
    userSaga(),
    loginSaga(),
    expenseSaga()
    
    
    // watchIncrementAsync()
  ]);
}
