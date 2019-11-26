import * as types from './actionTypes';

const clearProcessDefinitionXml = () => ({
  type: types.RESET_PROCEDURE_XML,
});

const fetchProcessDefinitionXml = processDefinitionId => ({
  type: types.FETCH_PROCESS_DEFINITION_XML,
  processDefinitionId,
});

const fetchProcessDefinitionXmlSuccess = payload => ({
  type: types.FETCH_PROCESS_DEFINITION_XML_SUCCESS,
  payload,
});

const fetchProcessDefinitionXmlFailure = () => ({
  type: types.FETCH_PROCESS_DEFINITION_XML_FAILURE,
});


export {
  fetchProcessDefinitionXml,
  fetchProcessDefinitionXmlSuccess,
  fetchProcessDefinitionXmlFailure,
  clearProcessDefinitionXml,

};
