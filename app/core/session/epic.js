import client from "../../common/rest/client";
import * as types from "./actionTypes";
import * as actions from "./actions";
import {Observable} from "rxjs/Observable";
import {combineEpics} from "redux-observable";

const fetchActiveSession = (action$, store) =>
    action$.ofType(types.FETCH_ACTIVE_SESSION)
        .mergeMap(action =>
            client({
                method: 'GET',
                path: `/api/reference-data/activesession?email=${store.getState().keycloak.tokenParsed.email}`,
                headers: {
                    "Accept": "application/json",
                    "Authorization": `Bearer ${store.getState().keycloak.token}`
                }
            }).map(payload => actions.fetchActiveSessionSuccess(payload))
                .catch(error => Observable.of(actions.fetchActiveSessionFailure(error))));

const createActiveSession = (action$, store) =>
    action$.ofType(types.CREATE_ACTIVE_SESSION)
        .mergeMap(action =>
            client({
                method: 'POST',
                entity: action.activeSession,
                path: `/api/workflow/sessions`,
                headers: {
                    "Authorization": `Bearer ${store.getState().keycloak.token}`,
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            }).map(payload => actions.createActiveSessionSuccess(payload))
                .catch(error => Observable.of(actions.createActiveSessionFailure(error))));

export default combineEpics(fetchActiveSession, createActiveSession);