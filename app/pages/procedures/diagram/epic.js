import * as types from './actionTypes';
import * as actions from './actions';
import { combineEpics } from 'redux-observable';
import { errorObservable } from '../../../core/error/epicUtil';
import { retry } from '../../../core/util/retry';

const fetchProcessDefinitionXml = (action$, store, { client }) =>
  action$.ofType(types.FETCH_PROCESS_DEFINITION_XML)
    .mergeMap(action =>
      client({
        method: 'GET',
        path: `${store.getState().appConfig.workflowServiceUrl}/rest/camunda/process-definition/key/${action.processDefinitionId}/xml`,
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${store.getState().keycloak.token}`,
        },
      }).retryWhen(retry).map(payload => actions.fetchProcessDefinitionXmlSuccess(payload))
        .catch(error => errorObservable(actions.fetchProcessDefinitionXmlFailure(), error),
        ));


export default combineEpics(fetchProcessDefinitionXml);
