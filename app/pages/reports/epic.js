import { combineEpics } from 'redux-observable';
import errorObservable from '../../core/error/epicUtil';
import retry from '../../core/util/retry';
import * as types from './actionTypes';
import * as actions from './actions';

const fetchReports = (action$, store, { client }) =>
  action$.ofType(types.FETCH_REPORTS_LIST).mergeMap(() =>
    client({
      method: 'GET',
      path: `${store.getState().appConfig.reportServiceUrl}/api/reports`,
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${store.getState().keycloak.token}`,
      },
    })
      .retryWhen(retry)
      .map(payload => actions.fetchReportsListSuccess(payload))
      .catch(error =>
        errorObservable(actions.fetchReportsListFailure(), error),
      ),
  );

export default combineEpics(fetchReports);
