import Immutable from 'immutable';
import * as actions from './actionTypes';

const { Map, List } = Immutable;

const initialState = new Map({
  isFetchingProcessDefinitions: true,
  processDefinitions: List([]),
  isFetchingProcessDefinition: false,
  processDefinition: Map({}),
  isFetchingProcessDefinitionXml: false,
  processDefinitionXml: null
});

function reducer(state = initialState, action) {
  switch (action.type) {
    case actions.FETCH_PROCESS_DEFINITIONS:
      return state.set('isFetchingProcessDefinitions', true);
    case actions.FETCH_PROCESS_DEFINITIONS_SUCCESS:
      const data = action.payload.entity._embedded ? action.payload.entity._embedded['process-definitions'] : [];
      return state.set('isFetchingProcessDefinitions', false)
        .set('processDefinitions', Immutable.fromJS(data));
    case actions.FETCH_PROCESS_DEFINITIONS_FAILURE:
      return state.set('isFetchingProcessDefinitions', false);
    case actions.RESET:
      return state
        .set('processDefinition', new Map({}))
        .set('isFetchingProcessDefinition', false)
        .set('isFetchingProcessDefinitionXml', false)
        .set('processDefinitionXml', null);
    case actions.FETCH_PROCESS_DEFINITION:
      return state
        .set('processDefinition', new Map({}))
        .set('isFetchingProcessDefinition', true);
    case actions.FETCH_PROCESS_DEFINITION_SUCCESS:
      const processDefinition = action.payload.entity ? action.payload.entity : {};
      return state.set('isFetchingProcessDefinition', false)
        .set('processDefinition', Immutable.fromJS(processDefinition));
    case actions.FETCH_PROCESS_DEFINITION_FAILURE:
      return state.set('isFetchingProcessDefinition', false);

    case actions.FETCH_PROCESS_DEFINITION_XML:
      return state.set('isFetchingProcessDefinitionXml', true);
    case actions.FETCH_PROCESS_DEFINITION_XML_SUCCESS:
      const xml = action.payload && action.payload.entity ? action.payload.entity.bpmn20Xml : null;
      return state.set('isFetchingProcessDefinitionXml', false)
        .set('processDefinitionXml', xml);
    default:
      return state;
  }
}


export default reducer;
