import Immutable from 'immutable';
import cloneDeep from 'lodash/cloneDeep';
import * as actions from './actionTypes';
import {
  FAILED,
  NOT_SUBMITTED,
  SUBMISSION_SUCCESSFUL,
  SUBMITTING,
} from './constants';

const { Map } = Immutable;

const initialState = new Map({
  loadingTaskForm: false,
  form: null,
  submissionStatus: NOT_SUBMITTED,
  customEventSubmissionStatus: NOT_SUBMITTED,
  submissionResponse: null,
  nextTask: null,
  nextVariables: null,
});

function reducer(state = initialState, action) {
  let entity;
  let rawVariables;
  const variables = {};

  switch (action.type) {
    case actions.RESET_FORM:
      return initialState;
    case actions.FETCH_TASK_FORM:
      return state
        .set('loadingTaskForm', true)
        .set('form', null)
        .set('taskFormCompleteSuccessful', false)
        .set('submittingTaskFormForCompletion', false);
    case actions.FETCH_TASK_FORM_SUCCESS:
      return state
        .set('loadingTaskForm', false)
        .set('form', action.payload.entity);
    case actions.FETCH_TASK_FROM_FAILURE:
      return state.set('loadingTaskForm', false);
    case actions.SUBMIT_TASK_FORM:
      return state.set('submissionStatus', SUBMITTING);
    case actions.SUBMIT_TASK_FORM_FAILURE:
      return state.set('submissionStatus', FAILED);
    case actions.COMPLETE_TASK_FORM:
      return state.set('submissionStatus', SUBMITTING);
    case actions.COMPLETE_TASK_FORM_SUCCESS:
      if (action.payload.entity !== '') {
        ({ variables: rawVariables = {} } = action.payload.entity);

        Object.keys(rawVariables).forEach(key => {
          if (rawVariables[key].type === 'Json') {
            variables[key] = JSON.parse(rawVariables[key].value);
          } else {
            variables[key] = rawVariables[key].value;
          }
        });
        entity = cloneDeep(action.payload.entity);
        entity.variables = variables;
      }
      return state
        .set('submissionStatus', SUBMISSION_SUCCESSFUL)
        .set('submissionResponse', entity);
    case actions.COMPLETE_TASK_FORM_FAILURE:
      return state.set('submissionStatus', FAILED);
    case actions.SET_NEXT_TASK:
      return state
        .set('nextTask', Immutable.fromJS(action.task))
        .set('nextVariables', action.variables);
    case actions.TASK_CUSTOM_EVENT:
      return state.set('customEventSubmissionStatus', SUBMITTING);
    case actions.TASK_CUSTOM_EVENT_SUCCESS:
      return state.set('customEventSubmissionStatus', SUBMISSION_SUCCESSFUL);
    case actions.TASK_CUSTOM_EVENT_FAILURE:
      return state.set('customEventSubmissionStatus', FAILED);
    default:
      return state;
  }
}

export default reducer;
