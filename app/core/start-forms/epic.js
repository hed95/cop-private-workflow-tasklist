import client from "../../common/rest/client";
import {combineEpics} from "redux-observable";
import * as actions from "./actions";
import * as types from "./actionTypes";
import {errorObservable} from "../error/epicUtil";
import PubSub from 'pubsub-js';
import {retryOnForbidden} from "../util/retry";


const fetchForm = (action$, store) =>
    action$.ofType(types.FETCH_FORM)
        .mergeMap(action =>
            client({
                method: 'GET',
                path: `/api/translation/form/${action.formName}`,
                headers: {
                    "Accept": "application/json",
                    "Authorization": `Bearer ${store.getState().keycloak.token}`
                }
            }).retryWhen(retryOnForbidden).map(payload => actions.fetchFormSuccess(payload))
                .catch(error => {
                        return errorObservable(actions.fetchFormFailure(), error);
                    }
                ));

const fetchFormWithContext = (action$, store) =>
    action$.ofType(types.FETCH_FORM_WITH_CONTEXT)
        .mergeMap(action =>
            client({
                method: 'POST',
                path: `/api/translation/form`,
                entity: {
                    "formName": action.formName,
                    "dataContext": action.dataContext
                },
                headers: {
                    'Content-Type': 'application/json',
                    "Accept": "application/json",
                    "Authorization": `Bearer ${store.getState().keycloak.token}`
                }
            }).retryWhen(retryOnForbidden).map(payload => actions.fetchFormSuccess(payload))
                .catch(error => {
                        return errorObservable(actions.fetchFormFailure(), error);
                    }
                ));

const submit = (action$, store) =>
    action$.ofType(types.SUBMIT)
        .mergeMap(action =>
            client({
                method: 'POST',
                path: `/api/form/${action.formId}/submission`,
                entity: {
                    "data": action.submissionData
                },
                headers: {
                    "Accept": "application/json",
                    "Authorization": `Bearer ${store.getState().keycloak.token}`,
                    'Content-Type': 'application/json'
                }
            }).take(1).map(payload => {
                return {
                    type: types.SUBMIT_TO_WORKFLOW,
                    processKey: action.processKey,
                    variableName: action.variableName,
                    data: payload.entity.data,
                    processName: action.processName
                }
            }).catch(error => {
                    return errorObservable(actions.submitFailure(), error);
                }
            ));

const submitToWorkflow = (action$, store) =>
    action$.ofType(types.SUBMIT_TO_WORKFLOW)
        .mergeMap(action =>
            client({
                method: 'POST',
                path: `/api/workflow/process-instances`,
                entity: {
                    "data": action.data,
                    "processKey": action.processKey,
                    "variableName": action.variableName
                },
                headers: {
                    "Accept": "application/json",
                    "Authorization": `Bearer ${store.getState().keycloak.token}`,
                    'Content-Type': 'application/json'
                }
            }).retryWhen(retryOnForbidden).map(payload => {
                console.log(JSON.stringify(action));
                PubSub.publish("submission", {
                    submission: true,
                    message: `${action.processName} successfully started`
                });
                return actions.submitToWorkflowSuccess(payload)
            }).catch(error => {
                return errorObservable(actions.submitToWorkflowFailure(), error)
            })
        );


export default combineEpics(fetchForm, fetchFormWithContext, submit, submitToWorkflow);