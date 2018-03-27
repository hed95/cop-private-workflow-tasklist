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



export {
    fetchForm,
    fetchFormSuccess,
    fetchFormFailure
}