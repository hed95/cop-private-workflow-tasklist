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


const fetchProcessDefinition = processKey => ({
    type: types.FETCH_PROCESS_DEFINITION,
    processKey
});

const fetchProcessDefinitionSuccess = payload => ({
    type: types.FETCH_PROCESS_DEFINITION_SUCCESS,
    payload
});


const fetchProcessDefinitionFailure =  () => ({
    type: types.FETCH_PROCESS_DEFINITION_FAILURE
});

const reset = () => ({
   type: types.RESET
});

export  {
    fetchProcessDefinitions,
    fetchProcessDefinitionsSuccess,
    fetchProcessDefinitionsFailure,
    fetchProcessDefinition,
    fetchProcessDefinitionSuccess,
    fetchProcessDefinitionFailure,
    reset

}