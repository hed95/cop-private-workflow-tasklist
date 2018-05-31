import * as types from './actionTypes';


const fetchShiftForm = () => ({
    type : types.FETCH_SHIFT_FORM
});



const fetchShiftFormSuccess = payload => ({
    type: types.FETCH_SHIFT_FORM_SUCCESS,
    payload
});

const fetchShiftFormFailure = () => ({
    type: types.FETCH_SHIFT_FORM_FAILURE
});


const fetchActiveShift = () => ({
    type: types.FETCH_ACTIVE_SHIFT
});

const fetchActiveShiftSuccess = payload => ({
    type: types.FETCH_ACTIVE_SHIFT_SUCCESS,
    payload
});

const fetchActiveShiftFailure = () => ({
    type: types.FETCH_ACTIVE_SHIFT_FAILURE
});

const createActiveShift = (shiftInfo) => ({
    type: types.CREATE_ACTIVE_SHIFT,
    shiftInfo
});

const createActiveShiftSuccess = payload => ({
    type: types.CREATE_ACTIVE_SHIFT_SUCCESS,
    payload
});

const createActiveShiftFailure = () => ({
    type: types.CREATE_ACTIVE_SHIFT_FAILURE
});

const submit = (formId, submissionData)=> ({
    type: types.SUBMIT_VALIDATION,
    formId,
    submissionData,
});

const submitSuccess = (payload) => ({
    type: types.SUBMIT_VALIDATION_SUCCESS,
    payload
});

const submitFailure = () => ({
    type: types.SUBMIT_VALIDATION_FAILURE
});

export {
    submit,
    submitSuccess,
    submitFailure,
    fetchActiveShift,
    fetchActiveShiftSuccess,
    fetchActiveShiftFailure,
    createActiveShift,
    createActiveShiftSuccess,
    createActiveShiftFailure,
    fetchShiftForm,
    fetchShiftFormSuccess,
    fetchShiftFormFailure
}