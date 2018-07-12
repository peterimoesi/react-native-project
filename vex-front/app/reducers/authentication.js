const initialState = {
    user : {
        email : ''
    },
    isAuthenticated : false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'IS_AUTENTICATED':
        return {
            ...state,
            isAuthenticated : true,
            user : action.user
        };
        case 'USER_LOGOUT':
        return {
            ...state,
            isAuthenticated : false,
            user : {
                email : ''
            }
        };
        default:
        return state;
    }
}