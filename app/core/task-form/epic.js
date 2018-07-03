import * as types from "./actionTypes";
import * as actions from "./actions";
import {errorObservable} from "../error/epicUtil";
import client from "../../common/rest/client";
import {combineEpics} from "redux-observable";
import PubSub from "pubsub-js";
import {retryOnForbidden} from "../util/retry";

const fetchTaskForm = (action$, store) =>
    action$.ofType(types.FETCH_TASK_FORM)
        .mergeMap(action =>
            client({
                method: 'GET',
                path: `/api/translation/form/${action.task.get('formKey')}?taskId=${action.task.get('id')}&processInstanceId=${action.task.get('processInstanceId')}`,
                headers: {
                    "Accept": "application/json",
                    "Authorization": `Bearer ${store.getState().keycloak.token}`
                }
            }).retryWhen(retryOnForbidden).map(payload => actions.fetchTaskFormSuccess(payload))
                .catch(error => {
                        return errorObservable(actions.fetchTaskFormFailure(), error);
                    }
                ));


const submitTaskForm = (action$, store) =>
    action$.ofType(types.SUBMIT_TASK_FORM)
        .mergeMap(action =>
            client({
                method: 'POST',
                path: `/api/form/${action.formId}/submission`,
                entity: {
                    "data": action.submission
                },
                headers: {
                    "Accept": "application/json",
                    "Authorization": `Bearer ${store.getState().keycloak.token}`,
                    'Content-Type': 'application/json'
                }
            }).take(1).map(payload => {
                const data = {
                    variables: {}
                };

                data.variables[action.variableName] = {
                    value: JSON.stringify(payload.entity.data),
                    type: 'Json',
                    valueInfo: {}
                };
                return {
                    type: types.COMPLETE_TASK_FORM,
                    taskId: action.taskId,
                    data: data
                }
            }).catch(error => {
                    return errorObservable(actions.submitTaskFormFailure(), error);
                }
            ));


const completeTaskForm = (action$, store) =>
    action$.ofType(types.COMPLETE_TASK_FORM)
        .mergeMap(action =>
            client({
                method: 'POST',
                path: `/api/workflow/tasks/${action.taskId}/form/_complete`,
                entity: action.data,
                headers: {
                    "Accept": "application/json",
                    "Authorization": `Bearer ${store.getState().keycloak.token}`,
                    'Content-Type': 'application/json'
                }
            }).retryWhen(retryOnForbidden).map(payload => {
                PubSub.publish("submission", {
                    submission: true,
                    message: `Task successfully completed`
                });
                return actions.completeTaskSuccess(payload)
            }).catch(error => {
                return errorObservable(actions.completeTaskFailure(), error)
            })
        );


export default combineEpics(fetchTaskForm, submitTaskForm, completeTaskForm);