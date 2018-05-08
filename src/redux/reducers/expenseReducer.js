

const addExpenseReducer = (state = [], action) => {
  // Change state with a return
  if(action.type === 'ADD_EXPENSE'){
    console.log('Got it!!!', action.payload);
    return action.payload;
} return state;
}

function getExpenseReducer (state = [], action) {
  switch (action.type) {
      case 'SET_EXPENSE_DATA':
          return action.payload;
      default:
          return state;
  }
}
function deleteExpenseReducer (state = [], action) {
   if (action.type ==='DELETE_EXPENSE') {
       console.log('Delete reducer')
            return action.payload;
        } return state;
}


export default addExpenseReducer;