import { combineEpics } from 'redux-observable';
import PubSub from 'pubsub-js';
import * as types from './actionTypes';
import * as actions from './actions';
import errorObservable from '../error/epicUtil';
import retry from '../util/retry';

const shift = (email, token, workflowUrl, client) => {
  return client({
    method: 'GET',
    path: `${workflowUrl}/api/workflow/shift/${email}`,
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
};

const endShift = (action$, store, { client }) =>
  action$.ofType(types.END_SHIFT).mergeMap(() =>
    client({
      method: 'DELETE',
      path: `${
        store.getState().appConfig.workflowServiceUrl
      }/api/workflow/shift/${
        store.getState().keycloak.tokenParsed.email
      }?deletedReason=finished`,
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${store.getState().keycloak.token}`,
      },
    })
      .retryWhen(retry)
      .map(payload => actions.endShiftSuccess(payload))
      .catch(error => errorObservable(actions.endShiftFailure(), error)),
  );

const fetchStaffDetails = (action$, store, { client }) =>
  action$.ofType(types.FETCH_STAFF_DETAILS).mergeMap(() =>
    client({
      method: 'POST',
      path: `${
        store.getState().appConfig.operationalDataUrl
      }/v1/rpc/staffdetails`,
      entity: {
        argstaffemail: `${store.getState().keycloak.tokenParsed.email}`,
      },
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${store.getState().keycloak.token}`,
      },
    })
      .retryWhen(retry)
      .map(payload => actions.fetchStaffDetailsSuccess(payload))
      .catch(error =>
        errorObservable(actions.fetchStaffDetailsFailure(), error),
      ),
  );

const fetchExtendedStaffDetails = (action$, store, { client }) =>
  action$.ofType(types.FETCH_EXTENDED_STAFF_DETAILS).mergeMap(() =>
    client({
      method: 'POST',
      path: `${
        store.getState().appConfig.operationalDataUrl
      }/v1/rpc/extendedstaffdetails`,
      entity: {
        argstaffemail: `${store.getState().keycloak.tokenParsed.email}`,
      },
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${store.getState().keycloak.token}`,
      },
    })
      .retryWhen(retry)
      .map(payload => {
        return actions.fetchExtendedStaffDetailsSuccess(payload);
      })
      .catch(error =>
        errorObservable(actions.fetchExtendedStaffDetailsFailure(), error),
      ),
  );

const fetchShiftForm = (action$, store, { client }) =>
  action$.ofType(types.FETCH_SHIFT_FORM).mergeMap(() =>
    client({
      method: 'GET',
      path: `${
        store.getState().appConfig.formUrl
      }/form/name/startShift?disableDataContext=false`,
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${store.getState().keycloak.token}`,
      },
    })
      .retryWhen(retry)
      .map(payload => actions.fetchShiftFormSuccess(payload))
      .catch(error => errorObservable(actions.fetchShiftFormFailure(), error)),
  );

const fetchActiveShift = (action$, store, { client }) =>
  action$.ofType(types.FETCH_ACTIVE_SHIFT).mergeMap(() =>
    shift(
      store.getState().keycloak.tokenParsed.email,
      store.getState().keycloak.token,
      store.getState().appConfig.workflowServiceUrl,
      client,
    )
      .map(payload => {
        return actions.fetchActiveShiftSuccess(payload);
      })
      .retryWhen(retry)
      .catch(error =>
        errorObservable(actions.fetchActiveShiftFailure(), error),
      ),
  );

const submit = (action$, store, { client }) =>
  action$.ofType(types.SUBMIT_VALIDATION).mergeMap(action => {
    const shiftData = action.submissionData;
    return client({
      method: 'POST',
      path: `${
        store.getState().appConfig.workflowServiceUrl
      }/api/workflow/shift`,
      entity: shiftData,
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${store.getState().keycloak.token}`,
        'Content-Type': 'application/json',
      },
    })
      .map(payload => {
        PubSub.publish('submission', {
          submission: true,
          autoDismiss: true,
          message: 'Shift successfully started',
        });
        return actions.createActiveShiftSuccess(payload);
      })
      .retryWhen(retry)
      .catch(error => errorObservable(actions.submitFailure(), error));
  });

export default combineEpics(
  fetchActiveShift,
  submit,
  fetchShiftForm,
  fetchStaffDetails,
  fetchExtendedStaffDetails,
  endShift,
);
