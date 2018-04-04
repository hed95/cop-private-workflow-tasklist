import client from "../../common/rest/client";
import {combineEpics} from "redux-observable";
import * as actions from "./actions";
import {Observable} from "rxjs/Observable";
import * as types from "./actionTypes";


const fetchForm = (action$, store) =>
    action$.ofType(types.FETCH_FORM)
        .mergeMap(action =>
            client({
                method: 'GET',
                path: `/api/form?name=${action.formName}`,
                headers: {
                    "Accept": "application/json",
                    "Authorization": `Bearer ${store.getState().keycloak.token}`
                }
            }).map(payload => actions.fetchFormSuccess(payload))
                .catch(error => Observable.of(actions.fetchFormFailure(error)))
        );


const submitForm = (action$, store) =>
    action$.ofType(types.SUBMIT_FORM)
        .mergeMap(action =>
            client({
                method: 'POST',
                path: `/api/form/${action.formId}/submission`,
                entity: action.submissionData,
                headers: {
                    "Accept": "application/json",
                    "Authorization": `Bearer ${store.getState().keycloak.token}`,
                    'Content-Type': 'application/json'
                }
            }).map(payload => actions.submitFormSuccess(payload))
                .catch(error => Observable.of(actions.submitFormFailure(error)))
        );

export default combineEpics(fetchForm, submitForm);