

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

export default addExpenseReducer;