import client from "../../common/rest/client";
import {errorObservable} from "../../core/error/epicUtil";
import * as types from "./actionTypes";
import * as actions from "./actions";
import {combineEpics} from "redux-observable";

const fetchTasksAssignedToMe = (action$, store) =>
    action$.ofType(types.FETCH_TASKS_ASSIGNED_TO_ME)
        .mergeMap(action =>
            client({
                method: 'GET',
                path: `${action.url}?assignedToMeOnly=true`,
                headers: {
                    "Accept": "application/json",
                    "Authorization": `Bearer ${store.getState().keycloak.token}`
                }
            }).map(payload => actions.fetchTasksAssignedToMeSuccess(payload))
                .catch(error => {
                        return errorObservable(actions.fetchTasksAssignedToMeFailure(), error);
                    }
                ));


const fetchMyGroupTasks = (action$, store) =>
    action$.ofType(types.FETCH_MY_GROUP_TASKS)
        .mergeMap(action =>
            client({
                method: 'GET',
                path: `${action.url}`,
                headers: {
                    "Accept": "application/json",
                    "Authorization": `Bearer ${store.getState().keycloak.token}`
                }
            }).map(payload => actions.fetchMyGroupTasksSuccess(payload))
                .catch(error => {
                        return errorObservable(actions.fetchMyGroupTasksFailure(), error);
                    }
                ));


const fetchUnassignedTasks = (action$, store) =>
    action$.ofType(types.FETCH_UNASSIGNED_TASKS)
        .mergeMap(action =>
            client({
                method: 'GET',
                path: `${action.url}`,
                headers: {
                    "Accept": "application/json",
                    "Authorization": `Bearer ${store.getState().keycloak.token}`
                }
            }).map(payload => actions.fetchUnassignedTasksSuccess(payload))
                .catch(error => {
                        return errorObservable(actions.fetchUnassignedTasksFailure(), error);
                    }
                ));

const fetchTaskCounts = (action$, store) =>
    action$.ofType(types.FETCH_TASK_COUNTS)
        .mergeMap(action =>
            client({
                method: 'GET',
                path: `/api/workflow/tasks/_task-counts`,
                headers: {
                    "Accept": "application/json",
                    "Authorization": `Bearer ${store.getState().keycloak.token}`
                }
            }).map(payload => actions.fetchTaskCountsSuccess(payload))
                .catch(error => {
                        return errorObservable(actions.fetchTaskCountsFailure(), error);
                    }
                ));

export default combineEpics(fetchTasksAssignedToMe, fetchMyGroupTasks, fetchUnassignedTasks, fetchTaskCounts);