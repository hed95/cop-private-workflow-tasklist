import Immutable from 'immutable';
import * as actions from './actionTypes';

const {Map, List} = Immutable;

const initialState = new Map({
    isFetchingProcessDefinitions: true,
    processDefinitions: List([]),
    error: false,
    errorMessage: null,
    processDefinition: new Map({}),
    isFetchingProcessDefinition: false
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
            return state.set('isFetchingProcessDefinitions', false)
                .set('error', true)
                .set('errorMessage', action.payload);
        case actions.FETCH_PROCESS_DEFINITION:
            return state.set('isFetchingProcessDefinition', true);
        case actions.FETCH_PROCESS_DEFINITION_SUCCESS:
            const processDefinition = action.payload.entity ? action.payload.entity : {};
            return state.set('isFetchingProcessDefinition', false)
                .set('processDefinition', Immutable.fromJS(processDefinition));
        case actions.FETCH_PROCESS_DEFINITION_FAILURE:
            return state.set('isFetchingProcessDefinition', false)
                .set('error', true)
                .set('errorMessage', action.payload);
        default:
            return state;
    }
}


export default reducer;
