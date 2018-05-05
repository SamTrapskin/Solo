const addMileageReducer = (state = [], action) => {
  // Change state with a return
  if(action.type === 'ADD_MILEAGE'){
    console.log('Got mileage!!!', action.payload);
    return action.payload;
} return state;
}



export default addMileageReducer;