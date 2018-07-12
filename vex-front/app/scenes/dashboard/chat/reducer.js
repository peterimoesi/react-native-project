const initialState = {
    conversationId : '',
    messages : []
};

export default (state = initialState, action) => {
    if (action.type === 'RECEIVED_MESSAGES'){
        return {
            ...state,
            messages : action.data
        }
    }
    else if (action.type === 'NEW_CONVERSATION_ID') {
        return {
            ...state,
            conversationId : action.id
        }
    }
    else if (action.type === 'CLEAR_MESSAGES') {
        return {
            messages : [],
            conversationId : ''
        }
    }
    else {
        return state;
    }
}
