import {
  form, loadingForm, submittingToWorkflow,
  submissionToWorkflowSuccessful,
  submittingToFormIO,
  submissionToFormIOSuccessful
} from './selectors';

import Immutable from 'immutable';
const { Map } = Immutable;

describe('Start form selector', () => {
  it('should return form', () => {
    const state = {form: new Map({
        form : {
            name: 'test'
        }
    })};
    const result = form(state);
    expect(result).toEqual(state.form.get('form'));
  });
  it('should return loadingForm', () => {
    const state = {form: new Map({
        loadingForm: true
      })};
    const result = loadingForm(state);
    expect(result).toEqual(true);
  });
  it('should return submittingToWorkflow', () => {
    const state = {form: new Map({
        submittingToWorkflow: true
      })};
    const result = submittingToWorkflow(state);
    expect(result).toEqual(true);
  });
  it('should return submissionToWorkflowSuccessful', () => {
    const state = {form: new Map({
        submissionToWorkflowSuccessful: true
      })};
    const result = submissionToWorkflowSuccessful(state);
    expect(result).toEqual(true);
  });

  it('should return submittingToFormIO', () => {
    const state = {form: new Map({
        submittingToFormIO: true
      })};
    const result = submittingToFormIO(state);
    expect(result).toEqual(true);
  });
  it('should return submissionToFormIOSuccessful', () => {
    const state = {form: new Map({
        submissionToFormIOSuccessful: true
      })};
    const result = submissionToFormIOSuccessful(state);
    expect(result).toEqual(true);
  });

});
