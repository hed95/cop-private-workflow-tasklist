import Immutable from 'immutable';
import * as actions from './actionTypes';

const {Map, List} = Immutable;

const initialState = new Map({
    isFetchingProcessDefinitions: true,
    processDefinitions: List([]),
    isFetchingProcessDefinition: false,
    processDefinition: Map({})
});

function reducer(state = initialState, action) {
    switch (action.type) {
        case actions.FETCH_PROCESS_DEFINITIONS:
            return state.set('isFetchingProcessDefinitions', true)
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
                .set('fetchingFailed', false);
        case actions.FETCH_PROCESS_DEFINITION:
            return state
                .set('processDefinition', new Map({}))
                .set('isFetchingProcessDefinition', true)
                .set('fetchingFailed', false);
        case actions.FETCH_PROCESS_DEFINITION_SUCCESS:
            const processDefinition = action.payload.entity ? action.payload.entity : {};
            return state.set('isFetchingProcessDefinition', false)
                .set('processDefinition', Immutable.fromJS(processDefinition));
        case actions.FETCH_PROCESS_DEFINITION_FAILURE:
            return state.set('isFetchingProcessDefinition', false);
        default:
            return state;
    }
}


export default reducer;
