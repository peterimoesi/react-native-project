const initialState = {
    messages : []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'GET_ALL_MESSAGES':
            return {
                ...state,
                messages : action.data
            };
        case 'CLEAR_ALL_MESSAGES':
            return {
                ...state,
                messages : []
            };
        default:
            return state;
    }
}
