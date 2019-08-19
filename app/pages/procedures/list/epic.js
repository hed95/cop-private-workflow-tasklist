import { combineEpics } from 'redux-observable';
import * as types from './actionTypes';
import * as actions from './actions';
import { errorObservable } from '../../../core/error/epicUtil';
import { retry } from '../../../core/util/retry';

const fetchProcessDefinitions = (action$, store, { client }) => action$.ofType(types.FETCH_PROCESS_DEFINITIONS)
  .mergeMap(action => client({
    method: 'GET',
    path: `${store.getState().appConfig.workflowServiceUrl}/api/workflow/process-definitions`,
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${store.getState().keycloak.token}`,
    },
  }).retryWhen(retry).map(payload => actions.fetchProcessDefinitionsSuccess(payload))
    .catch(error => errorObservable(actions.fetchProcessDefinitionsFailure(), error)));

export default combineEpics(fetchProcessDefinitions);
