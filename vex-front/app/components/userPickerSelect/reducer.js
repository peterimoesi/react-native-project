const initialState = {
    userType : 'buyer'
};

export default (state = initialState, action) => {
    if (action.type === 'USERTYPE_CHANGE') {
        return {
            userType : action.userType
        }
    } else {
        return state;
    }
}
