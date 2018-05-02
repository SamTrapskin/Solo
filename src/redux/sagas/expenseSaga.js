import {call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* addExpenseInfo(action){
    console.log('POST expense saga triggered', action)
    try {
        yield call(axios.post, '/api/expense', action.payload);
        yield put({
            type: 'GET_EXPENSE',
        })
    } catch (error) {}
}

function* getExpenseInfo(action){
    console.log('GET expense saga triggered', action)
    try {
        const addExpenseInfoResponse = yield call(axios.get, '/api/expense');
        console.log(addExpenseInfoResponse) 
        yield put({
            type: 'SET_EXPENSE_DATA', // for the reducer
            payload: addExpenseInfoResponse.data // data to use
        })
    } catch (error) {}
}

function* addExpenseSaga() {
    // When GET_TOTALS is dispached, call the getUserInfo function
    yield takeEvery('ADD_EXPENSE', addExpenseInfo);
    yield takeEvery('GET_EXPENSE', getExpenseInfo);
}

export default addExpenseSaga;
