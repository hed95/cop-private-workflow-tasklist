import * as types from './actionTypes';
import * as actions from './actions';
import { combineEpics } from 'redux-observable';
import { retry } from '../util/retry';
import * as Rx from 'rxjs';


const logError = (action$, store, { client }) =>
  action$.ofType(types.LOG_ERROR)
    .mergeMap(action =>
      client({
        method: 'POST',
        path: `/log`,
        entity: action.payload,
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${store.getState().keycloak.token}`
        }
      })
        .retryWhen(retry)
        .map(payload => actions.logErrorSuccess())
        .catch(error => {
            return Rx.Observable.of(actions.logErrorFailure())
        }));



export default combineEpics(logError);
