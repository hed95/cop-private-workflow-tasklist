import client from "../../common/rest/client";
import {combineEpics} from "redux-observable";
import * as actions from "./actions";
import {Observable} from "rxjs/Observable";
import * as types from "./actionTypes";
import * as sessionTypes from '../../core/session/actionTypes'
import {errorObservable} from "../error/epicUtil";


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
            }).map(payload => actions.fetchFormSuccess(payload))
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
            }).map(payload => actions.fetchFormSuccess(payload))
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
                if (action.processKey === 'activate-session') {
                    return {
                        type: sessionTypes.CREATE_ACTIVE_SESSION,
                        activeSession: payload.entity.data
                    }
                } else {
                    return {
                        type: types.SUBMIT_TO_WORKFKOW,
                        processKey: action.processKey,
                        variableName: action.variableName,
                        data: payload.entity.data
                    }
                }

            })  .catch(error => {
                    return errorObservable(actions.submitFailure(), error);
                }
            ));

const submitToWorkflow = (action$, store) =>
    action$.ofType(types.SUBMIT_TO_WORKFKOW)
        .mergeMap(action => {
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
                }).map(payload => {
                    return Observable.of(actions.submitToWorkflowSuccess(payload))
                }).catch(error => {
                    return errorObservable(actions.submitToWorkflowFailure(), error);

                })
            }
        );


export default combineEpics(fetchForm, fetchFormWithContext, submit, submitToWorkflow);