const addMileageReducer = (state = [], action) => {
  // Change state with a return
  if(action.type === 'ADD_MILEAGE'){
    console.log('Got mileage!!!', action.payload);
    return action.payload;
} return state;
}

function getMileageReducer (state = [], action) {
  switch (action.type) {
      case 'SET_MILEAGE_DATA':
          return action.payload;
      default:
          return state;
  }
}
function deleteMileageReducer (state = [], action) {
   if (action.type ==='DELETE_MILEAGE') {
       console.log('Delete reducer')
            return action.payload;
        } return state;
}



export default addMileageReducer;