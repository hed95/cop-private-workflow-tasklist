import { combineEpics } from 'redux-observable';
import PubSub from 'pubsub-js';
import * as types from './actionTypes';
import * as actions from './actions';
import { errorObservable } from '../../../core/error/epicUtil';
import { retry } from '../../../core/util/retry';


const fetchProcessDefinition = (action$, store, { client }) => action$.ofType(types.FETCH_PROCESS_DEFINITION)
  .mergeMap(action => client({
    method: 'GET',
    path: `${store.getState().appConfig.workflowServiceUrl}/api/workflow/process-definitions/${action.processKey}`,
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${store.getState().keycloak.token}`,
    },
  }).retryWhen(retry).map(payload => actions.fetchProcessDefinitionSuccess(payload))
    .catch(error => errorObservable(actions.fetchProcessDefinitionFailure(), error)));

const fetchForm = (action$, store, { client }) => action$.ofType(types.FETCH_FORM)
  .mergeMap(action => client({
    method: 'GET',
    path: `${store.getState().appConfig.translationServiceUrl}/api/translation/form/${action.formName}`,
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${store.getState().keycloak.token}`,
    },
  })
    .retryWhen(retry)
    .map(payload => actions.fetchFormSuccess(payload))
    .catch(error => errorObservable(actions.fetchFormFailure(), error)));

const fetchFormWithContext = (action$, store, { client }) => action$.ofType(types.FETCH_FORM_WITH_CONTEXT)
  .mergeMap(action => client({
    method: 'POST',
    path: `${store.getState().appConfig.translationServiceUrl}/api/translation/form`,
    entity: {
      formName: action.formName,
      dataContext: action.dataContext,
    },
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${store.getState().keycloak.token}`,
    },
  })
    .retryWhen(retry)
    .map(payload => actions.fetchFormSuccess(payload))
    .catch(error => errorObservable(actions.fetchFormFailure(), error)));

const submit = (action$, store, { client }) => action$.ofType(types.SUBMIT)
  .mergeMap(action => {
    const { submissionData } = action;
    return client({
      method: 'POST',
      path: `${store.getState().appConfig.formServiceUrl}/form/${action.formId}/submission`,
      entity: {
        data: submissionData,
      },
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${store.getState().keycloak.token}`,
        'Content-Type': 'application/json',
      },
    })
      .retryWhen(retry)
      .map(payload => {
        if (action.nonShiftApiCall) {
          return {
            type: types.SUBMIT_TO_WORKFLOW_NON_SHIFT,
            processKey: action.processKey,
            variableName: action.variableName,
            data: submissionData,
            processName: action.processName,
          };
        }
        return {
          type: types.SUBMIT_TO_WORKFLOW,
          processKey: action.processKey,
          variableName: action.variableName,
          data: payload.entity.data,
          processName: action.processName,
          formId: action.formId,
        };
      })
      .catch(error => errorObservable(actions.submitFailure(), error));
  });


const submitToWorkflow = (action$, store, { client }) => action$.ofType(types.SUBMIT_TO_WORKFLOW)
  .mergeMap(action => client({
    method: 'POST',
    path: `${store.getState().appConfig.translationServiceUrl}/api/translation/workflow/process-instances`,
    entity: {
      data: action.data,
      processKey: action.processKey,
      variableName: action.variableName,
      formId: action.formId,
    },
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${store.getState().keycloak.token}`,
      'Content-Type': 'application/json',
    },
  })
    .retryWhen(retry)
    .map(payload => {
      PubSub.publish('submission', {
        submission: true,
        autoDismiss: true,
        message: `${action.processName} successfully started`,
      });
      return actions.submitToWorkflowSuccess(payload);
    })
    .catch(error => errorObservable(actions.submitToWorkflowFailure(), error)));

const createVariable = (action, email) => {
  const { variableName } = action;
  const variables = {};
  variables[variableName] = {
    value: JSON.stringify(action.data),
    type: 'json',
  };
  variables.initiatedBy = {
    value: email,
    type: 'String',
  };

  variables.type = {
    value: 'non-notifications',
    type: 'String',
  };
  return {
    variables,
  };
};

const submitToWorkflowUsingNonShiftApi = (action$, store, { client }) => action$.ofType(types.SUBMIT_TO_WORKFLOW_NON_SHIFT)
  .mergeMap(action => client({
    method: 'POST',
    path: `${store.getState().appConfig.workflowServiceUrl}/rest/camunda/process-definition/key/${action.processKey}/start`,
    entity: createVariable(action, store.getState().keycloak.tokenParsed.email),
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${store.getState().keycloak.token}`,
      'Content-Type': 'application/json',
    },
  }).retryWhen(retry)
    .map(payload => {
      console.log(JSON.stringify(action));
      PubSub.publish('submission', {
        submission: true,
        autoDismiss: true,
        message: `${action.processName} successfully started`,
      });
      return actions.submitToWorkflowSuccess(payload);
    })
    .catch(error => errorObservable(actions.submitToWorkflowFailure(), error)));


export default combineEpics(fetchProcessDefinition, fetchForm, fetchFormWithContext, submit, submitToWorkflow, submitToWorkflowUsingNonShiftApi);
