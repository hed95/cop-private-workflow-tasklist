import * as types from './actionTypes';

const fetchForm = formName => ({
   type : types.FETCH_FORM,
   formName
});

const fetchFormSuccess = payload => ({
   type: types.FETCH_FORM_SUCCESS,
   payload
});

const fetchFormFailure = error => ({
    error: true,
    payload: error.raw.message,
    type: types.FETCH_FORM_FAILURE
});


const submitForm = (formId, submissionData)=> ({
    type: types.SUBMIT_FORM,
    formId,
    submissionData
});

const submitFormSuccess = payload => ({
    type: types.SUBMIT_FORM_SUCCESS,
    payload
});

const submitFormFailure = error => ({
    type: types.SUBMIT_FORM_FAILURE,
    error
});


export {
    fetchForm,
    fetchFormSuccess,
    fetchFormFailure,
    submitForm,
    submitFormSuccess,
    submitFormFailure
}