import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/merge';
import {combineEpics} from 'redux-observable';
import client from '../../common/rest/client';
import { showLoading, hideLoading } from 'react-redux-loading-bar';

import * as types from './actionTypes';
import * as actions from './actions';
import {errorObservable} from "../../core/error/epicUtil";
import {retryOnForbidden} from "../../core/util/retry";

const fetchNotifications = (action$, store) =>
    action$.ofType(types.FETCH_NOTIFICATIONS)
        .mergeMap(action =>
                Observable.merge(
                    Observable.of(showLoading('notifications')),
                    client({
                        method: 'GET',
                        path: `${action.url}`,
                        headers: {
                            "Accept": "application/json",
                            "Authorization": `Bearer ${store.getState().keycloak.token}`
                        }
                    }).retryWhen(retryOnForbidden).map(payload => actions.fetchNotificationsSuccess(payload))
                        .catch(error => {
                                return errorObservable(actions.fetchNotificationsFailure(), error);
                            }
                        )
                        .concat(Observable.of(hideLoading('notifications'))),
                ));


const acknowledgeNotification = (action$, store) =>
    action$.ofType(types.ACKNOWLEDGE_NOTIFICATION)
        .mergeMap(action =>
            client({
                method: 'DELETE',
                path: `/api/workflow/notifications/task/${action.taskId}`,
                headers: {
                    "Accept": "application/json",
                    "Authorization": `Bearer ${store.getState().keycloak.token}`
                }
            }).retryWhen(retryOnForbidden).map(payload => {
                return actions.acknowledgeNotificationSuccess(payload)
            }) .catch(error => {
                    return errorObservable(actions.acknowledgeNotificationFailure(action.taskId), error);
                }
            ));

export default combineEpics(fetchNotifications, acknowledgeNotification);
