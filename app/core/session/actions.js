import * as types from './actionTypes';

const fetchActiveSession = () => ({
    type: types.FETCH_ACTIVE_SESSION
});

const fetchActiveSessionSuccess = payload => ({
    type: types.FETCH_ACTIVE_SESSION_SUCCESS,
    payload
});

const fetchActiveSessionFailure = error => ({
    error: true,
    payload: error.raw.message,
    type: types.FETCH_ACTIVE_SESSION_FAILURE
});

const createActiveSession = (activeSession) => ({
    type: types.CREATE_ACTIVE_SESSION,
    activeSession
});

const createActiveSessionSuccess = payload => ({
    type: types.CREATE_ACTIVE_SESSION_SUCCESS,
    payload
});

const createActiveSessionFailure = error => ({
    error: true,
    payload: error,
    type: types.CREATE_ACTIVE_SESSION_FAILURE
});


export  {
    fetchActiveSession,
    fetchActiveSessionSuccess,
    fetchActiveSessionFailure,
    createActiveSession,
    createActiveSessionSuccess,
    createActiveSessionFailure
}