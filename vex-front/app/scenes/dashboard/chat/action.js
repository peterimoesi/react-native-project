import axios from 'axios';
import { homeRoute } from '../../../utils/parentRoute';

export function startNewConversation(text, userId, recipentId, token) {
    return dispatch => axios.post(`${homeRoute}/api/conversation`, { userId, recipentId, text }, {
        headers: {'Authorization': token}
    })
    .then((res) => {
        dispatch({
            type : 'NEW_CONVERSATION_ID',
            id : res.data.conversationId
        });
        return res.data.conversationId;
    })
    .catch(e => console.log(e))
}

export function getConversation(id, token) {
    return dispatch => axios.get(`${homeRoute}/api/conversation/${id}`, {
        headers: {'Authorization': token}
    })
    .then((res) => {
        // const formatedMessages = []
        // res.data.message.forEach(x => {
        //     x.user.name = x.user.fullName;
        //     formatedMessages.push(x);
        // });
        const messages = res.data.message.map(x => {
            x.user.name = x.user.fullName || x.user.email;
            return x;
        });
        dispatch({
            type : 'RECEIVED_MESSAGES',
            data : messages
        })
        return 200;
    })
    .catch(e => console.log(e))
}

export function clearMessages() {
    return {
        type : 'CLEAR_MESSAGES'
    }
}

export function getConversationId(userId, recipentId, token) {
    return dispatch => axios.get(`${homeRoute}/api/conversation/requestid/${userId}/${recipentId}`, {
        headers: {'Authorization': token}
    })
    .then(res => {
            dispatch({
            type : 'NEW_CONVERSATION_ID',
            id : res.data.conversationId
        });
        return 200;
    })
    .catch(e => console.log(e));
}

export function saveNewMessage(data, token) {
    return dispatch => axios.post(`${homeRoute}/api/conversation/reply/`, data, {
        headers: {'Authorization': token}
    })
    .then(res => {
            dispatch({
                type : 'NEW_REPLY_MESSAGE',
            });
        return 200;
    })
    .catch(e => console.log(e));
}

