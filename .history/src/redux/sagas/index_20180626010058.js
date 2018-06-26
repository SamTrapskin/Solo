import { all } from 'redux-saga/effects';
// import userSaga from './userSaga';
// import loginSaga from './loginSaga';

import expenseSaga from './expenseSaga';
import mileageSaga from './mileageSaga';
// import imageSaga from './imageSaga';   RELEASE 2.0



export default function* rootSaga() {
  yield all([
    // userSaga(),
    // loginSaga(),
    expenseSaga(),
    mileageSaga(),
    // imageSaga()    RELEASE 2.0
    
    
    watchIncrementAsync()
  ]);
}
