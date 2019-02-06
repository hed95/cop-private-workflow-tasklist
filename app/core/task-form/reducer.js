import Immutable from 'immutable';
import * as actions from './actionTypes';

const { Map } = Immutable;

const initialState = new Map({
  loadingTaskForm: false,
  form: null,
  submittingToFormIO: false,
  submissionToFormIOSuccessful: false,
  submittingTaskFormForCompletion: false,
  taskFormCompleteSuccessful: null,
  customEventSuccessfullyExecuted: false,
  submittingCustomEvent: false
});

function reducer(state = initialState, action) {
  switch (action.type) {
    case actions.RESET_FORM:
      return initialState;
    case actions.FETCH_TASK_FORM:
      return state.set('loadingTaskForm', true)
        .set('form', null)
        .set('taskFormCompleteSuccessful', false)
        .set('submittingTaskFormForCompletion', false);
    case actions.FETCH_TASK_FORM_SUCCESS:
      const data = action.payload.entity;
      return state.set('loadingTaskForm', false)
        .set('form', data);
    case actions.FETCH_TASK_FROM_FAILURE:
      return state.set('loadingTaskForm', false);
    case actions.SUBMIT_TASK_FORM:
      return state.set('submittingToFormIO', true);
    case actions.SUBMIT_TASK_FORM_FAILURE:
      return state.set('submittingToFormIO', false)
        .set('submissionToFormIOSuccessful', false);
    case actions.COMPLETE_TASK_FORM:
      return state.set('submittingTaskFormForCompletion', true)
        .set('submittingToFormIO', false)
        .set('submissionToFormIOSuccessful', true);
    case actions.COMPLETE_TASK_FORM_SUCCESS:
      return state.set('submittingTaskFormForCompletion', false)
        .set('taskFormCompleteSuccessful', true);
    case actions.COMPLETE_TASK_FORM_FAILURE:
      return state.set('submittingTaskFormForCompletion', false)
        .set('taskFormCompleteSuccessful', false);

    case actions.TASK_CUSTOM_EVENT:
      return state.set('submittingCustomEvent', true);
    case actions.TASK_CUSTOM_EVENT_SUCCESS:
      return state.set('submittingCustomEvent', false)
        .set('customEventSuccessfullyExecuted', true);
    case actions.TASK_CUSTOM_EVENT_FAILURE:
      return state.set('submittingCustomEvent', false)
        .set('customEventSuccessfullyExecuted', false);
     default:
      return state;
  }

}

export default reducer;
