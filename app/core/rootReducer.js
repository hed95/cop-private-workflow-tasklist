import {combineReducers} from 'redux';
import {loadingBarReducer} from 'react-redux-loading-bar';
import keycloakReducer from './../common/security/keycloakReducer'
import notificationPage from '../pages/messages';
import shiftPage from './shift/index';
import processDefinitions from '../pages/procedures/index';
import error from '../core/error/index';
import task from '../pages/task/index'
import tasks from '../pages/tasks/index';
import taskForm from '../core/task-form/index';
import reports from '../pages/reports/index';

import form from './start-forms/index';
import {routerReducer} from 'react-router-redux'
import {combineEpics} from 'redux-observable';

export const rootEpic = combineEpics(
    notificationPage.epic,
    shiftPage.epic,
    form.epic,
    processDefinitions.epic,
    task.epic,
    tasks.epic,
    taskForm.epic,
    reports.epic
);


export const rootReducer = combineReducers({
    loadingBar: loadingBarReducer,
    routing: routerReducer,
    keycloak: keycloakReducer,
    [notificationPage.constants.NAME]: notificationPage.reducer,
    [shiftPage.constants.NAME]: shiftPage.reducer,
    [form.constants.NAME]: form.reducer,
    [processDefinitions.constants.NAME]: processDefinitions.reducer,
    [error.constants.NAME]: error.reducer,
    [task.constants.NAME]: task.reducer,
    [tasks.constants.NAME]: tasks.reducer,
    [taskForm.constants.NAME]: taskForm.reducer,
    [reports.constants.NAME]: reports.reducer
});