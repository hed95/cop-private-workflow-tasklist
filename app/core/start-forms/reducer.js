import Immutable from 'immutable';
import * as actions from './actionTypes';

const {Map, List} = Immutable;

const initialState = new Map({
    loadingForm: true,
    form: null,
    submittingFormForValidation: false,
    submittingToWorkflow: false,
    submissionToWorkflowSuccessful: false,
});

function reducer(state = initialState, action) {
    switch (action.type) {
        case actions.FETCH_FORM:
            return state.set('loadingForm', true);
        case actions.FETCH_FORM_SUCCESS:
            const data = action.payload.entity;
            return state.set('loadingForm', false)
                .set('form', data);
        case actions.FETCH_FORM_FAILURE:
            return state.set('loadingForm', false);

        case actions.SUBMIT:
            return state.set('submittingFormForValidation', true);
        case actions.SUBMIT_SUCCESS:
            console.log('IFrame: No errors from FromIO');
            return state.set('submittingFormForValidation', true);
        case actions.SUBMIT_FAILURE:
            return state.set('submittingFormForValidation', false);

        case actions.SUBMIT_TO_WORKFKOW:
            console.log('IFrame: Submitting to workflow');
             return state.set('submittingToWorkflow', true)
                .set('submissionToWorkflowSuccessful', false);
        case actions.SUBMIT_TO_WORKFKOW_SUCCESS:
            console.log('IFrame: Submission to workflow successful');
            return state.set('submittingToWorkflow', false)
                .set('submissionToWorkflowSuccessful', true);
        case actions.SUBMIT_TO_WORKFKOW_FAILURE:
            return state.set('submittingToWorkflow', false)
                .set('submissionToWorkflowSuccessful', false);

        default:
            return state;
    }
}

export default reducer;
