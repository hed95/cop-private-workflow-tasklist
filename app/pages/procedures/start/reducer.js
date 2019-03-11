import Immutable from 'immutable';
import * as actions from './actionTypes';

const { Map } = Immutable;

const initialState = new Map({
  isFetchingProcessDefinition: true,
  processDefinition: Map({}),
  loadingForm: true,
  form: null,
  submittingToFormIO: false,
  submissionToFormIOSuccessful: false,
  submittingToWorkflow: false,
  submissionToWorkflowSuccessful: null
});

function reducer(state = initialState, action) {
  switch (action.type) {
    case actions.FETCH_PROCESS_DEFINITION:
      return state;
    case actions.FETCH_PROCESS_DEFINITION_SUCCESS:
      const processDefinition = action.payload.entity ? action.payload.entity : {};
      return state.set('isFetchingProcessDefinition', false)
        .set('processDefinition', Immutable.fromJS(processDefinition));
    case actions.FETCH_PROCESS_DEFINITION_FAILURE:
      return state.set('isFetchingProcessDefinition', false);
    case actions.RESET_PROCEDURE:
      return initialState;
    case actions.FETCH_FORM:
      return state;
    case actions.FETCH_FORM_SUCCESS:
      const data = action.payload.entity;
      return state.set('loadingForm', false)
        .set('form', data);
    case actions.FETCH_FORM_FAILURE:
      return state.set('loadingForm', false);
    case actions.SUBMIT:
      return state.set('submittingToFormIO', true);
    case actions.SUBMIT_FAILURE:
      return state.set('submittingToFormIO', false)
        .set('submissionToFormIOSuccessful', false);
    case actions.SUBMIT_TO_WORKFLOW || actions.SUBMIT_TO_WORKFLOW_NON_SHIFT:
      console.log('IFrame: Submitting to workflow');
      return state.set('submittingToWorkflow', true)
        .set('submissionToFormIOSuccessful', true)
        .set('submittingToFormIO', false);
    case actions.SUBMIT_TO_WORKFLOW_SUCCESS:
      console.log('IFrame: Submission to workflow successful');
      return state.set('submittingToWorkflow', false)
        .set('submissionToWorkflowSuccessful', true);
    case actions.SUBMIT_TO_WORKFLOW_FAILURE:
      return state.set('submittingToWorkflow', false)
        .set('submissionToWorkflowSuccessful', false);
    default:
      return state;
  }
}


export default reducer;
