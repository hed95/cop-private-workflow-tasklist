import * as types from './actionTypes';

const fetchProcessDefinitions = () => ({
    type: types.FETCH_PROCESS_DEFINITIONS
});

const fetchProcessDefinitionsSuccess = payload => ({
    type: types.FETCH_PROCESS_DEFINITIONS_SUCCESS,
    payload
});


const fetchProcessDefinitionsFailure = () => ({
   type: types.FETCH_PROCESS_DEFINITIONS_FAILURE
});

export  {
    fetchProcessDefinitions,
    fetchProcessDefinitionsSuccess,
    fetchProcessDefinitionsFailure
}
