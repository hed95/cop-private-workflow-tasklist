import * as actions from './actions';
import reducer from './reducer';
import Immutable from 'immutable';

describe('Start Form Reducer', () => {
  const initialState = reducer.initialState;

  it('captures dispatch to fetch form', () => {
    const state = reducer(initialState, actions.fetchForm('formName'));
    expect(state).toEqual(Immutable.fromJS({
        loadingForm: true,
        form: null,
        submittingToFormIO: false,
        submissionToFormIOSuccessful: false,
        submittingToWorkflow: false,
        submissionToWorkflowSuccessful: false,
      }));
  });
  it('captures successful form fetch', () => {
    const formObject = {
      name: 'testForm',
      components: [
        {
          key: 'key'
        }
      ]
    };
    const state = reducer(initialState, actions.fetchFormSuccess({
      entity: formObject
    }));
    expect(state.get('form')).toEqual(formObject);
    expect(state.get('loadingForm')).toEqual(false);
  });
  it('captures unsuccessful form fetch', () => {
    const state = reducer(initialState,actions.fetchFormFailure());
    expect(state.get('loadingForm')).toEqual(false);
  });
  it('captures form submit', () => {
    const state = reducer(initialState, actions.submit(
      'formId', 'processKey', 'variableName', {}, 'processName'
    ));
    expect(state.get('submittingToFormIO')).toEqual(true);
  });
  it('captures form submit failure', () => {
    const state = reducer(initialState, actions.submitFailure());
    expect(state.get('submittingToFormIO')).toEqual(false);
    expect(state.get('submissionToFormIOSuccessful')).toEqual(false);

  });
  it('captures form submit to workflow', () => {
    const state = reducer(initialState, actions.submitToWorkflow(
      'processKey', 'variableName', {}, 'processName'
    ));
    expect(state.get('submittingToWorkflow')).toEqual(true);
    expect(state.get('submissionToFormIOSuccessful')).toEqual(true);
    expect(state.get('submittingToFormIO')).toEqual(false);
  });
  it('captures successful submit to workflow', () => {
    const state = reducer(initialState, actions.submitToWorkflowSuccess({}));
    expect(state.get('submittingToWorkflow')).toEqual(false);
    expect(state.get('submissionToWorkflowSuccessful')).toEqual(true);
  });
  it('captures failure to submit to workflow', () => {
    const state = reducer(initialState, actions.submitToWorkflowFailure());
    expect(state.get('submittingToWorkflow')).toEqual(false);
    expect(state.get('submissionToWorkflowSuccessful')).toEqual(false);
  });
});
