import * as types from './actionTypes';

const fetchNotifications = () => ({
  type: types.FETCH_NOTIFICATIONS,
});

const fetchNotificationsSuccess = payload => ({
  type: types.FETCH_NOTIFICATIONS_SUCCESS,
  payload,
});

const fetchNotificationsFailure = () => ({
  type: types.FETCH_NOTIFICATIONS_FAILURE,
});

const fetchNotificationsNextPage = url => ({
  type: types.FETCH_NOTIFICATIONS_NEXT_PAGE,
  url,
});

const fetchNotificationsNextPageSuccess = payload => ({
  type: types.FETCH_NOTIFICATIONS_NEXT_PAGE_SUCCESS,
  payload,
});

const fetchNotificationsNextPageFailure = () => ({
  type: types.FETCH_NOTIFICATIONS_NEXT_PAGE_FAILURE,
});


const acknowledgeNotification = taskId => ({
  type: types.ACKNOWLEDGE_NOTIFICATION,
  taskId,
});

const acknowledgeNotificationSuccess = payload => ({
  type: types.ACKNOWLEDGE_NOTIFICATION_SUCCESS,
  payload,
});

const acknowledgeNotificationFailure = taskId => ({
  type: types.ACKNOWLEDGE_NOTIFICATION_FAILURE,
  taskId,
});

const clearNotifications = () => ({
  type: types.CLEAR_NOTIFICATIONS,
});

export {
  fetchNotifications,
  fetchNotificationsSuccess,
  fetchNotificationsFailure,
  acknowledgeNotification,
  acknowledgeNotificationSuccess,
  acknowledgeNotificationFailure,
  fetchNotificationsNextPage,
  fetchNotificationsNextPageSuccess,
  fetchNotificationsNextPageFailure,
  clearNotifications,
};
