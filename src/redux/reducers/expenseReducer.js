

const addExpenseReducer = (state = [], action) => {
  // Change state with a return
  if(action.type === 'ADD_EXPENSE'){
    console.log('Got it!!!', action.payload);
    return action.payload;
} return state;
}



export default addExpenseReducer;