import Immutable from 'immutable';
import * as actions from './actionTypes';

const {Map, List} = Immutable;

const initialState = new Map({
    loadingForm: true,
    form: null,
    error: null,
    formLoadingFailed: false,
    formValidationError: false,
    validationErrors: List([]),
    submittingFormForValidation: false
});

function reducer(state = initialState, action) {
    switch (action.type) {
        case actions.FETCH_FORM:
            return state.set('loadingForm', true)
                .set('formLoadingFailed', false);
        case actions.FETCH_FORM_SUCCESS:
            const data = action.payload.entity;
            return state.set('loadingForm', false)
                .set('form', data[0])
                .set('formLoadingFailed', false);
        case actions.FETCH_FORM_FAILURE:
            return state.set('loadingForm', false)
                .set('error', action.payload)
                .set('formLoadingFailed', true);

        case actions.SUBMIT_FORM:
            return state.set('submittingFormForValidation', true)
                .set('validationErrors', List([]))
                .set('formValidationError', false);
        case actions.SUBMIT_FORM_SUCCESS:
            return state.set('submittingFormForValidation', false)
                .set('validationErrors', List([]))
                .set('formValidationError', false);
        case actions.SUBMIT_FORM_FAILURE:
            const hasValidationErrors = true;
            const validationErrors = List([]);
            return state.set('submittingFormForValidation', false)
                .set('formValidationError', hasValidationErrors)
                .set('validationErrors', validationErrors);
        default:
            return state;
    }
}

export default reducer;
