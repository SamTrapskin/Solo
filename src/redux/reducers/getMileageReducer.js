function getMileageReducer (state = [], action) {
    switch (action.type) {
        case 'SET_MILEAGE_DATA':
            return action.payload;
        default:
            return state;
    }
}

export default getMileageReducer;