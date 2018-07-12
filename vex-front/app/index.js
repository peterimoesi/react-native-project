/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { AppRegistry, Platform, AsyncStorage } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import logger from 'redux-logger';

import { Navigation } from 'react-native-navigation';
import registerScreens from './scenes/index.js';

import { appInitialized, setUserData } from './actions/appInitialize.js';
import reducer from './reducers/index.js';

import FindIc from './assets/findIc.png';
import AdvertiseIc from './assets/advertiseIc.png';
import MessagesIc from './assets/messages.png';
import ProfileIc from './assets/profileIc.png';

import { navigatorStyle } from './utils/navbarStyle';

// const loggerMiddleware = createLogger({ predicate: (getState, action) => __DEV__ });

const middlewares = [];

if (process.env.NODE_ENV === `development`) {
	middlewares.push(logger);
}

const enhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const configureStore = (initialState) => {
    return createStore(reducer, initialState, enhancer(applyMiddleware(...middlewares, thunkMiddleware)));
}

const store = configureStore({});
registerScreens(store, Provider);

// type Props = {};

const tabStyle = {
	tabBarSelectedButtonColor : '#246F98',
}

// store persit for user authentication

export default class App extends Component {
	constructor(props) {
		super(props);
		store.subscribe(this.onStoreUpdate.bind(this));
		AsyncStorage.multiGet(['token', 'userCredentials'])
			.then((res) => {
				if ((res[0] && (res[0][0] === 'token') && res[0][1]) &&
					(res[1] && (res[1][0] === 'userCredentials') && res[1][1])
				) {
					store.dispatch(setUserData({...JSON.parse(res[1][1]), token : res[0][1]}));
				} else {
					store.dispatch(appInitialized());
				}
			})
			.catch((e) => {
				console.log(e);
				store.dispatch(appInitialized());
			});
		// get usertype from store
		this.navigatorStyle = navigatorStyle(store.getState().userType.userType);
	}

	onStoreUpdate() {
		let { isAuthenticated } = store.getState().userAuthentication;
		if (this.currentAuthentication !== isAuthenticated) {
			this.currentAuthentication = isAuthenticated;
			this.startApp(isAuthenticated);
		}
	}

	startApp(status) {
		switch(status) {
			case false:
				Navigation.startSingleScreenApp({
					screen : {
						screen : 'Welcome',
						title : 'Welcome',
						navigatorStyle: { navBarHidden: true }, 
						navigatorButtons: {} 
					},
				});
				return;
			case true:
				Navigation.startTabBasedApp({
					tabs : [
						{
							label : 'Find',
							screen : 'Dashboard.Find',
							icon: FindIc,
							navigatorStyle: this.navigatorStyle, // override the navigator style for the tab screen, see "Styling the navigator" below (optional),
							navigatorButtons: {},
							title: 'Order a service',
						},
						{
							label : 'inbox',
							screen : 'Dashboard.Inbox',
							icon: MessagesIc,
							navigatorStyle: this.navigatorStyle, // override the navigator style for the tab screen, see "Styling the navigator" below (optional),
							navigatorButtons: {},
							title: 'Inbox',
						},
						{
							label : 'Profile',
							screen : 'Dashboard.Profile',
							icon: ProfileIc,
							navigatorStyle: this.navigatorStyle, // override the navigator style for the tab screen, see "Styling the navigator" below (optional),
							navigatorButtons: {
								rightButtons : [{
									title: 'Logout', // for a textual button, provide the button title (label)
									id: 'userLogout',
								}]
							},
							title: 'Profile',
						}
					],
					tabsStyle : {...tabStyle},
					appStyle : { ... tabStyle}
				})
			default:
				console.log("No root found");
		}
	}
}
