import { combineReducers } from 'redux';

import conversations from '../scenes/dashboard/chat/reducer';
import allMessages from '../scenes/dashboard/inbox/reducer';
import searchResults from '../scenes/dashboard/searchResults/reducer';
import userAuthentication from './authentication.js';
import userType from '../components/userPickerSelect/reducer';

const allReducers = combineReducers({
    allMessages,
    conversations,
    searchResults,
    userAuthentication,
    userType
});

export default allReducers;
