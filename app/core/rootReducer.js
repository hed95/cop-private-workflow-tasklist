import {combineReducers} from 'redux';
import {loadingBarReducer} from 'react-redux-loading-bar';
import keycloakReducer from './../common/security/keycloakReducer'
import profilePage from '../pages/profile';
import notificationPage from '../pages/notifications';
import sessionPage from '../core/session/index';
import person from '../core/person/index';

import form from './start-forms/index';
import {  routerReducer } from 'react-router-redux'
import {combineEpics} from 'redux-observable';

export const rootEpic = combineEpics(
    profilePage.epic,
    notificationPage.epic,
    sessionPage.epic,
    form.epic,
    person.epic

);


export const rootReducer = combineReducers({
    loadingBar: loadingBarReducer,
    routing: routerReducer,
    keycloak: keycloakReducer,
    [profilePage.constants.NAME]: profilePage.reducer,
    [notificationPage.constants.NAME]: notificationPage.reducer,
    [sessionPage.constants.NAME]: sessionPage.reducer,
    [form.constants.NAME]: form.reducer,
    [person.constants.NAME]: person.reducer
});