import {combineReducers} from 'redux';
import {loadingBarReducer} from 'react-redux-loading-bar';
import keycloakReducer from './../common/security/keycloakReducer'
import profilePage from '../pages/profile';
import notificationPage from '../pages/notifications';
import {combineEpics} from 'redux-observable';

export const rootEpic = combineEpics(
    profilePage.epic,
    notificationPage.epic
);


export const rootReducer = combineReducers({
    loadingBar: loadingBarReducer,
    keycloak: keycloakReducer,
    [profilePage.constants.NAME]: profilePage.reducer,
    [notificationPage.constants.NAME]: notificationPage.reducer
});