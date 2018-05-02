function getExpenseReducer (state = [], action) {
    switch (action.type) {
        case 'SET_EXPENSE_DATA':
            return action.payload;
        default:
            return state;
    }
}

export default getExpenseReducer;