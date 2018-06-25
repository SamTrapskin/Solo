const addMileageReducer = (state = [], action) => {
  // Change state with a return
  if(action.type === 'ADD_MILEAGE'){
    console.log('Got mileage!!!', action.payload);
    return action.payload;
} return state;
}


function deleteMileageReducer (state = [], action) {
   if (action.type ==='DELETE_MILEAGE') {
       console.log('Delete reducer')
            return action.payload;
        } return state;
}

function updateMileageReducer (state = [], action) {
    if (action.type === 'UPDATE_MILEAGE') {
        console.log('Update reducer')
            return action.payload;
        }
    }

    



export default addMileageReducer;