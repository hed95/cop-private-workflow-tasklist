import Immutable from 'immutable';
import * as actions from './actionTypes';

const {Map, List} = Immutable;

const initialState = new Map({
    loadingForm: true,
    form: null,
    error: null,
    formLoadingFailed: false,
    hasFormValidationErrors: false,
    validationErrors: List([]),
    submittingFormForValidation: false,
    submittingToWorkflow: false,
    submissionToWorkflowSuccessful: false,
    submissionToWorkflowError: null
});

function reducer(state = initialState, action) {
    switch (action.type) {
        case actions.FETCH_FORM:
            return state.set('loadingForm', true)
                .set('formLoadingFailed', false);
        case actions.FETCH_FORM_SUCCESS:
            const data = action.payload.entity;
            return state.set('loadingForm', false)
                .set('form', data)
                .set('formLoadingFailed', false);
        case actions.FETCH_FORM_FAILURE:
            return state.set('loadingForm', false)
                .set('error', action.payload)
                .set('formLoadingFailed', true);
        case actions.SUBMIT:
            return state.set('submittingFormForValidation', true)
                .set('validationErrors', List([]))
                .set('hasFormValidationErrors', false);
        case actions.SUBMIT_SUCCESS:
            console.log('IFrame: No errors from FromIO');
            return state.set('submittingFormForValidation', true)
                .set('validationErrors', List([]))
                .set('hasFormValidationErrors', false);
        case actions.SUBMIT_FAILURE:
            console.log('IFrame: Errors from FormIO ' + JSON.stringify(action.error));
            const hasValidationErrors = action.error.status.code === 400;
            const validationErrors = Immutable.fromJS(action.entity.details);
            return state.set('submittingFormForValidation', false)
                .set('hasFormValidationErrors', hasValidationErrors)
                .set('validationErrors', validationErrors);

        case actions.SUBMIT_TO_WORKFKOW:
            console.log('IFrame: Submitting to workflow');
             return state.set('submittingToWorkflow', true)
                .set('submissionToWorkflowSuccessful', false)
                .set('submissionToWorkflowError', null);
        case actions.SUBMIT_TO_WORKFKOW_SUCCESS:
            console.log('IFrame: Submission to workflow successful');
            return state.set('submittingToWorkflow', false)
                .set('submissionToWorkflowSuccessful', true)
                .set('submissionToWorkflowError', null);

        case actions.SUBMIT_TO_WORKFKOW_FAILURE:
            console.log('IFrame: Errors from workflow ' + JSON.stringify(action.error));
            return state.set('submittingToWorkflow', false)
                .set('submissionToWorkflowSuccessful', false)
                .set('submissionToWorkflowError', action.entity);

        default:
            return state;
    }
}

export default reducer;
