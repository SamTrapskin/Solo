import {call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* getMileageInfo(action){
    console.log('GET mileage saga triggered', action)
    try {
        const addMileageInfoResponse = yield call(axios.get, '/api/mileage');
        console.log(addMileageInfoResponse) 
        yield put({
            type: 'SET_MILEAGE_DATA', // for the reducer
            payload: addMileageInfoResponse.data // data to use
        })
    } catch (error) {}
}
function* addMileageInfo(action){
    console.log('POST mileage saga triggered', action)
    try {
        yield call(axios.post, '/api/mileage', action.payload);
        yield put({
            type: 'GET_MILEAGE',
        })
    } catch (error) {}
}

function* deleteMileageInfo(action){
    console.log('DELETE expense saga triggered', action)
        try{
            yield call(axios.delete, '/api/mileage', action.payload);
            yield put({
                type:'DELETE_MILEAGE',
            })
        } catch (error) {}
}



function* addMileageSaga() {
    // When GET_TOTALS is dispached, call the getUserInfo function
    yield takeEvery('GET_MILEAGE', getMileageInfo);
    yield takeEvery('ADD_MILEAGE', addMileageInfo);
    yield takeEvery('DELETE_MILEAGE', deleteMileageInfo)
}
export default addMileageSaga;
