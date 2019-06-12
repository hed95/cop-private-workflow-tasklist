import 'rxjs/add/observable/of';
import 'rxjs/add/operator/merge';
import { combineEpics } from 'redux-observable';

import * as types from './actionTypes';
import * as actions from './actions';
import { errorObservable } from '../../core/error/epicUtil';
import { retry } from '../../core/util/retry';

const fetchNotifications = (action$, store, { client }) =>
  action$.ofType(types.FETCH_NOTIFICATIONS)
    .mergeMap(action =>
      client({
        method: 'GET',
        path: `${store.getState().appConfig.workflowServiceUrl}/api/workflow/notifications?countOnly=false`,
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${store.getState().keycloak.token}`,
        },
      }).retryWhen(retry)
        .map(payload => actions.fetchNotificationsSuccess(payload))
        .catch(error => errorObservable(actions.fetchNotificationsFailure(), error),
        ));

const fetchNotificationsNextPage = (action$, store, { client }) =>
  action$.ofType(types.FETCH_NOTIFICATIONS_NEXT_PAGE)
    .mergeMap(action =>
      client({
        method: 'GET',
        path: `${action.url}`,
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${store.getState().keycloak.token}`,
        },
      }).retryWhen(retry)
        .map(payload => actions.fetchNotificationsNextPageSuccess(payload))
        .catch(error => errorObservable(actions.fetchNotificationsNextPageFailure(), error),
        ));


const acknowledgeNotification = (action$, store, { client }) =>
  action$.ofType(types.ACKNOWLEDGE_NOTIFICATION)
    .mergeMap(action =>
      client({
        method: 'DELETE',
        path: `${store.getState().appConfig.workflowServiceUrl}/api/workflow/notifications/task/${action.taskId}`,
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${store.getState().keycloak.token}`,
        },
      })
        .retryWhen(retry)
        .map(payload => actions.acknowledgeNotificationSuccess(payload))
        .catch(error => errorObservable(actions.acknowledgeNotificationFailure(action.taskId), error),
        ));

export default combineEpics(fetchNotifications, acknowledgeNotification, fetchNotificationsNextPage);
