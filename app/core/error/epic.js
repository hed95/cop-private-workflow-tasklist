import * as types from './actionTypes';
import * as actions from './actions';
import { combineEpics } from 'redux-observable';
import { retry } from '../util/retry';
import * as Rx from 'rxjs';


const log = (action$, store, { client }) =>
  action$.ofType(types.LOG)
    .mergeMap(action =>
      client({
        method: 'POST',
        path: `/log`,
        entity: action.payload,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${store.getState().keycloak.token}`
        }
      })
        .retryWhen(retry)
        .map(payload => actions.logSuccess())
        .catch(error => {
            return Rx.Observable.of(actions.logFailure())
        }));



export default combineEpics(log);
