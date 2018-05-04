
function deleteExpenseReducer (state = [], action) {
    switch (action.type) {
        case 'DELETE_EXPENSE':
            return action.payload;
        default:
            return state;
    }
}