import axios from 'axios';

import { homeRoute } from '../../../utils/parentRoute';

function getTime(iso) {
    const newTime = new Date(iso);
    return newTime.getTime();
}

export function getAllMessages(userId, token) {
    return dispatch => axios.get(`${homeRoute}/api/conversation/all/${userId}`, {
        headers: {'Authorization': token}
    })
        .then(res => {
            console.log(res.data);
            dispatch({
                type : 'GET_ALL_MESSAGES',
                data : res.data.conversations.sort((a, b) => getTime(b.updatedAt) - getTime(a.updatedAt))
            })
        })
        .catch(e => console.log(e))
}

export function sendConversationId(id) {
    return {
        type : 'NEW_CONVERSATION_ID',
        id
    }
}

export function clearAllMessages() {
    return {
        type : 'CLEAR_ALL_MESSAGES'
    };
}
