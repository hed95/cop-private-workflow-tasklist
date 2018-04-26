import * as types from './actionTypes';

const fetchProcessDefinitions = () => ({
    type: types.FETCH_PROCESS_DEFINITIONS
});

const fetchProcessDefinitionsSuccess = payload => ({
    type: types.FETCH_PROCESS_DEFINITIONS_SUCCESS,
    payload
});


const fetchProcessDefinitionsFailure =  error => ({
   error: true,
   payload: error,
   type: types.FETCH_PROCESS_DEFINITIONS_FAILURE
});


const fetchProcessDefinition = processKey => ({
    type: types.FETCH_PROCESS_DEFINITION,
    processKey
});

const fetchProcessDefinitionSuccess = payload => ({
    type: types.FETCH_PROCESS_DEFINITION_SUCCESS,
    payload
});


const fetchProcessDefinitionFailure =  error => ({
    error: true,
    payload: error,
    type: types.FETCH_PROCESS_DEFINITION_FAILURE
});



export  {
    fetchProcessDefinitions,
    fetchProcessDefinitionsSuccess,
    fetchProcessDefinitionsFailure,
    fetchProcessDefinition,
    fetchProcessDefinitionSuccess,
    fetchProcessDefinitionFailure

}