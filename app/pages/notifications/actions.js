import * as types from './actionTypes';

const fetchNotifications = url => ({
    type: types.FETCH_NOTIFICATIONS, url
});

const fetchNotificationsSuccess = payload => ({
    type: types.FETCH_NOTIFICATIONS_SUCCESS, payload
});

const fetchNotificationsFailure = () => ({
    type: types.FETCH_NOTIFICATIONS_FAILURE,
});

const acknowledgeNotification = taskId => ({
    type: types.ACKNOWLEDGE_NOTIFICATION, taskId
});

const acknowledgeNotificationSuccess = payload => ({
    type: types.ACKNOWLEDGE_NOTIFICATION_SUCCESS,
    payload
});

const acknowledgeNotificationFailure = (taskId) => ({
    type: types.ACKNOWLEDGE_NOTIFICATION_FAILURE,
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