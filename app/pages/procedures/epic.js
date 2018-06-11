import client from "../../common/rest/client";
import * as types from "./actionTypes";
import * as actions from "./actions";
import * as errorActions from '../../core/error/actions';
import {Observable} from "rxjs/Observable";
import {combineEpics} from "redux-observable";
import {errorObservable} from "../../core/error/epicUtil";
import {retryOnForbidden} from "../../core/util/retry";

const fetchProcessDefinitions = (action$, store) =>
    action$.ofType(types.FETCH_PROCESS_DEFINITIONS)
        .mergeMap(action => {
            return client({
                method: 'GET',
                path: `/api/workflow/process-definitions`,
                headers: {
                    "Accept": "application/json",
                    "Authorization": `Bearer ${store.getState().keycloak.token}`
                }
            }).retryWhen(retryOnForbidden).map(payload => actions.fetchProcessDefinitionsSuccess(payload))
                .catch(error => {
                    return errorObservable(actions.fetchProcessDefinitionsFailure(), error);
                    }
                );
        });


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
            }).retryWhen(retryOnForbidden).map(payload => actions.fetchProcessDefinitionSuccess(payload))
                .catch(error => {
                        return errorObservable(actions.fetchProcessDefinitionFailure(), error);
                    }
                ));

export default combineEpics(fetchProcessDefinitions, fetchProcessDefinition);