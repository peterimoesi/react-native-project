import axios from 'axios';
import { workRoute, homeRoute } from '../../../utils/parentRoute';

export function getService(name, token) {
    console.log(token);
    return dispatch => axios.get(`${homeRoute}/api/services/${name}`, {
        headers: {'Authorization': token}
    })
        .then((res) => {
            dispatch({
                type : 'UPDATE_SEARCH_RESULTS',
                data : res.data.service
            });
            return 200;
        })
        .catch((e) => {
            console.log(e);
            return 400;
        })
}
