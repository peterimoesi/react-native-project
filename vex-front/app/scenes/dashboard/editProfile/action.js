import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { setUserData } from '../../../actions/appInitialize';

import { workRoute, homeRoute } from '../../../utils/parentRoute';

export function saveProfile(data, id, token) {
    return dispatch => axios.patch(`${homeRoute}/api/users/profile/${id}`, data, {
        headers: {'Authorization': token}
    })
        .then((res) => {
            console.log(res.data);
            const { user} = res.data;
            AsyncStorage.setItem('userCredentials', JSON.stringify(user))
            dispatch(setUserData({...user, token}));
            return 200;
        })
        .catch(e => console.log(e))
}