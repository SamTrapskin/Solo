// import {call, put, takeEvery } from 'redux-saga/effects';
// import axios from 'axios';



// function* getImage(action){
//     console.log('GET image saga triggered', action)
//     try {
//         const addImageResponse = yield call(axios.get, '/api/image');
//         console.log(addImageResponse) 
//         yield put({
//             type: 'SET_IMAGE_DATA', // for the reducer
//             payload: addImageResponse.data // data to use
//         })
//     } catch (error) {}
// }

// function* addImage(action, name){
//     console.log('POST image saga triggered', action)
//     try {
//         yield call(axios.post, '/api/image', action.payload);
//         yield put({
//             type: 'GET_IMAGE',
//         })
//     } catch (error) {}
// }

// function* addImageSaga() {
//     // When GET_TOTALS is dispached, call the getUserInfo function
//     yield takeEvery('GET_IMAGE', getImage);
//     yield takeEvery('ADD_IMAGE', addImage);
// }

// export default addImageSaga;
