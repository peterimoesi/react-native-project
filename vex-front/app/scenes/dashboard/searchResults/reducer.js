const initialState = {
    results : []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE_SEARCH_RESULTS':
            return {
                ...state,
                results : action.data
            };
        case 'CLEAR_SEARCH_RESULTS':
            return {
                ...state,
                results : []
            };
        default:
            return state;
    }
}