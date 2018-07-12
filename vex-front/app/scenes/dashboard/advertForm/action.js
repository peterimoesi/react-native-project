import axios from 'axios';

import { workRoute, homeRoute } from '../../../utils/parentRoute';

export function submitForm(id, data, token) {
    return dispatch => axios.post(`${homeRoute}/api/services/${id}/register`, data, {
        headers: {'Authorization': token}
    })
        .then((res) => {console.log(res); return 200; })
        .catch(e => console.log(e))
}