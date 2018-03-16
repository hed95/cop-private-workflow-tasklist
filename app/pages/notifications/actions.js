import * as types from './actionTypes';

const fetchNotifications = url => ({
    type: types.FETCH_NOTIFICATIONS, url
});

const fetchNotificationsSuccess = payload => ({
    type: types.FETCH_NOTIFICATIONS_SUCCESS, payload
});

const fetchNotificationsFailure = error => ({
    type: types.FETCH_NOTIFICATIONS_FAILURE,
    error: true,
    payload: error.raw.message
});

const acknowledgeNotification = taskId => ({
    type: types.ACKNOWLEDGE_NOTIFICATION, taskId
});

const acknowledgeNotificationSuccess = payload => ({
    type: types.ACKNOWLEDGE_NOTIFICATION_SUCCESS,
    payload
});

const acknowledgeNotificationFailure = (taskId, error) => ({
    type: types.ACKNOWLEDGE_NOTIFICATION_FAILURE,
    error: true,
    payload: error.raw.message,
    taskId: taskId
});


export {
    fetchNotifications,
    fetchNotificationsSuccess,
    fetchNotificationsFailure,
    acknowledgeNotification,
    acknowledgeNotificationSuccess,
    acknowledgeNotificationFailure
}