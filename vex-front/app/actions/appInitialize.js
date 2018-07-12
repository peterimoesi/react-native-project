import { AsyncStorage } from 'react-native';

export function appInitialized() {
    return async function(dispatch, getState) {
        AsyncStorage.multiRemove(['token', 'userCredentials']);
        dispatch({
            type : 'USER_LOGOUT',
            root : 'login'
        });
    };
  }

export function setUserData(user) {
    return {
        type : 'IS_AUTENTICATED',
        user
    }
}

export function userLogin() {
    return {
        type : 'IS_AUTENTICATED'
    }
}
