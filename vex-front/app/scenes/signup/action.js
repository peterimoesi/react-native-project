import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { setUserData } from '../../actions/appInitialize';

import { homeRoute } from '../../utils/parentRoute';

export function signupAction (email, password, confirmPassword) {
    return dispatch => axios.post(`${homeRoute}/api/users/register`, { email, password, fullName })
        .then((res) => {
            const { user, token } = res.data;
            AsyncStorage.multiSet([['token', token], ['userCredentials', JSON.stringify(user)]])
            dispatch(setUserData({...user, token}));
            return 200;
        })
        .catch(e => { console.log(e); return 401; })
}
