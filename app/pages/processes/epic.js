import client from "../../common/rest/client";
import * as types from "./actionTypes";
import * as actions from "./actions";
import {Observable} from "rxjs/Observable";
import {combineEpics} from "redux-observable";

const fetchProcessDefinitions = (action$, store) =>
    action$.ofType(types.FETCH_PROCESS_DEFINITIONS)
        .mergeMap(action =>
            client({
                method: 'GET',
                path: `/api/workflow/process-definitions`,
                headers: {
                    "Accept": "application/json",
                    "Authorization": `Bearer ${store.getState().keycloak.token}`
                }
            }).map(payload => actions.fetchProcessDefinitionsSuccess(payload))
                .catch(error => Observable.of(actions.fetchProcessDefinitionsFailure(error))));


const fetchProcessDefinition = (action$, store) =>
    action$.ofType(types.FETCH_PROCESS_DEFINITION)
        .mergeMap(action =>
            client({
                method: 'GET',
                path: `/api/workflow/process-definitions/${action.processKey}`,
                headers: {
                    "Accept": "application/json",
                    "Authorization": `Bearer ${store.getState().keycloak.token}`
                }
            }).map(payload => actions.fetchProcessDefinitionSuccess(payload))
                .catch(error => Observable.of(actions.fetchProcessDefinitionFailure(error))));

export default combineEpics(fetchProcessDefinitions, fetchProcessDefinition);