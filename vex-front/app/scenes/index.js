import { Navigation } from 'react-native-navigation';

import Welcome from './welcome/index.js';
import Find from './dashboard/find';
import AdvertForm from './dashboard/advertForm';
import Login from './login/index';
import Profile from './dashboard/profile';
import EditProfile from './dashboard/editProfile';
import SearchResults from './dashboard/searchResults';
import JobDetails from './dashboard/jobDetails';
import Signup from './signup';
import Chat from './dashboard/chat';
import Inbox from './dashboard/inbox';
import NotificationComponent from './notification';

const registerComponent = (id, Component, store, Provider) => (
    Navigation.registerComponent(id, () => Component, store, Provider)
)

export default (store, Provider) => {
    registerComponent('Welcome', Welcome, store, Provider);
    registerComponent('Dashboard.Find', Find, store, Provider);
    registerComponent('Dashboard.AdvertForm', AdvertForm, store, Provider);
    registerComponent('Dashboard.Inbox', Inbox, store, Provider);
    registerComponent('Dashboard.Profile', Profile, store, Provider);
    registerComponent('Dashboard.EditProfile', EditProfile, store, Provider);
    registerComponent('Welcome.Login', Login, store, Provider );
    registerComponent('Welcome.Signup', Signup, store, Provider );
    registerComponent('Dashboard.SearchResults', SearchResults, store, Provider);
    registerComponent('Dashboard.JobDetails', JobDetails, store, Provider);
    registerComponent('Dashboard.Chat', Chat, store, Provider);
    registerComponent('Dashboard.Notification', NotificationComponent, store, Provider);
}
