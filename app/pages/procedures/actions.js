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

const fetchProcessDefinitionXml = (processDefinitionId) => ({
  type: types.FETCH_PROCESS_DEFINITION_XML,
  processDefinitionId
});

const fetchProcessDefinitionXmlSuccess = (payload) =>({
  type: types.FETCH_PROCESS_DEFINITION_XML_SUCCESS,
  payload
});

const fetchProcessDefinitionXmlFailure = () =>({
  type: types.FETCH_PROCESS_DEFINITION_XML_FAILURE
});


export  {
    fetchProcessDefinitions,
    fetchProcessDefinitionsSuccess,
    fetchProcessDefinitionsFailure,
    fetchProcessDefinition,
    fetchProcessDefinitionSuccess,
    fetchProcessDefinitionFailure,
    reset,
    fetchProcessDefinitionXml,
    fetchProcessDefinitionXmlSuccess,
    fetchProcessDefinitionXmlFailure

}
