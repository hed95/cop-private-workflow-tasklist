import * as types from './actionTypes';

const fetchPerson = () => ({
    type: types.FETCH_PERSON
});

const fetchPersonSuccess = (payload) => ({
    type: types.FETCH_PERSON_SUCCESS,
    payload
});

const fetchPersonFailure = () => ({
    type: types.FETCH_PERSON_FAILURE,
});

export {
    fetchPerson,
    fetchPersonSuccess,
    fetchPersonFailure
}