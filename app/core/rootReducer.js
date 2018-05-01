import {combineReducers} from 'redux';
import {loadingBarReducer} from 'react-redux-loading-bar';
import keycloakReducer from './../common/security/keycloakReducer'
import notificationPage from '../pages/notifications';
import sessionPage from '../core/session/index';
import person from '../core/person/index';
import processDefinitions from '../pages/processes/index';
import error from '../core/error/index';
import task from '../pages/task/index'
import tasks from '../pages/tasks/index';

import form from './start-forms/index';
import {  routerReducer } from 'react-router-redux'
import {combineEpics} from 'redux-observable';

export const rootEpic = combineEpics(
    notificationPage.epic,
    sessionPage.epic,
    form.epic,
    person.epic,
    processDefinitions.epic,
    task.epic,
    tasks.epic
);


export const rootReducer = combineReducers({
    loadingBar: loadingBarReducer,
    routing: routerReducer,
    keycloak: keycloakReducer,
    [notificationPage.constants.NAME]: notificationPage.reducer,
    [sessionPage.constants.NAME]: sessionPage.reducer,
    [form.constants.NAME]: form.reducer,
    [person.constants.NAME]: person.reducer,
    [processDefinitions.constants.NAME]: processDefinitions.reducer,
    [error.constants.NAME]: error.reducer,
    [task.constants.NAME]: task.reducer,
    [tasks.constants.NAME]: tasks.reducer
});