import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { setUserData } from '../../actions/appInitialize';

import { workRoute, homeRoute } from '../../utils/parentRoute';

export function loginAction (email, password) {
    return dispatch => axios.post(`${homeRoute}/api/users/login`, { email, password })
        .then((res) => {
            const { user, token } = res.data;
            AsyncStorage.multiSet([['token', token], ['userCredentials', JSON.stringify(user)]])
            dispatch(setUserData({...user, token}));
            return 200;
        })
        .catch(e => { console.log(e); return 401; })
}