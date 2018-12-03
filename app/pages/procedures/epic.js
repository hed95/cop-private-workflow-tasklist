import * as types from "./actionTypes";
import * as actions from "./actions";
import {combineEpics} from "redux-observable";
import {errorObservable} from "../../core/error/epicUtil";
import {retryOnForbidden} from "../../core/util/retry";

const fetchProcessDefinitions = (action$, store, {client}) =>
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


const fetchProcessDefinition = (action$, store,  {client}) =>
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

const fetchProcessDefinitionXml = (action$, store,  {client}) =>
  action$.ofType(types.FETCH_PROCESS_DEFINITION_XML)
    .mergeMap(action =>
      client({
        method: 'GET',
        path: `/rest/camunda/process-definition/key/${action.processDefinitionId}/xml`,
        headers: {
          "Accept": "application/json",
          "Authorization": `Bearer ${store.getState().keycloak.token}`
        }
      }).retryWhen(retryOnForbidden).map(payload => actions.fetchProcessDefinitionXmlSuccess(payload))
        .catch(error => {
            return errorObservable(actions.fetchProcessDefinitionXmlFailure(), error);
          }
        ));


export default combineEpics(fetchProcessDefinitions, fetchProcessDefinition, fetchProcessDefinitionXml);
