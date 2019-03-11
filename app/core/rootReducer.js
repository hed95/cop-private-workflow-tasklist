import {combineReducers} from 'redux';
import {loadingBarReducer} from 'react-redux-loading-bar';
import keycloakReducer from './../common/security/keycloakReducer'
import notificationPage from '../pages/messages';
import shift from '../core/shift/index';
import procedures from '../pages/procedures/list/index';
import procedureDiagram from '../pages/procedures/diagram/index';
import procedureStart from '../pages/procedures/start/index';
import error from '../core/error/index';
import task from '../pages/task/index'
import tasks from '../pages/tasks/index';
import taskForm from '../core/task-form/index';
import reports from '../pages/reports/index';

import {routerReducer} from 'react-router-redux'
import {combineEpics} from 'redux-observable';
import dashboard from "../pages/dashboard";
import appConfigReducer from "../common/appConfigReducer";

export const rootEpic = combineEpics(
    notificationPage.epic,
    shift.epic,
    procedures.epic,
    procedureDiagram.epic,
    procedureStart.epic,
    task.epic,
    tasks.epic,
    taskForm.epic,
    reports.epic,
    dashboard.epic
);

export const rootReducer = combineReducers({
    loadingBar: loadingBarReducer,
    routing: routerReducer,
    keycloak: keycloakReducer,
    appConfig: appConfigReducer,
    [notificationPage.constants.NAME]: notificationPage.reducer,
    [shift.constants.NAME]: shift.reducer,
    [procedures.constants.NAME]: procedures.reducer,
    [procedureDiagram.constants.NAME]: procedureDiagram.reducer,
    [procedureStart.constants.NAME]: procedureStart.reducer,
    [error.constants.NAME]: error.reducer,
    [task.constants.NAME]: task.reducer,
    [tasks.constants.NAME]: tasks.reducer,
    [taskForm.constants.NAME]: taskForm.reducer,
    [reports.constants.NAME]: reports.reducer,
    [dashboard.constants.NAME]: dashboard.reducer
});
