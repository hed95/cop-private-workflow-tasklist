import * as types from './actionTypes';

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


export {
    fetchActiveShift,
    fetchActiveShiftSuccess,
    fetchActiveShiftFailure,
    createActiveShift,
    createActiveShiftSuccess,
    createActiveShiftFailure
}