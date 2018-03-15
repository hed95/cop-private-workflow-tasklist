import Immutable from 'immutable';
import * as actions from './actionTypes';

const {Map, List} = Immutable;

const initialState = new Map({
    groupTasks: new Map({
        isFetching: false,
        data: List([]),
        error: '',
        nextHref: '',
        previousHref: '',
        firstHref: '',
        lastHref: ''
    })
});

function reducer(state = initialState, action) {
    switch (action.type) {
        case actions.FETCH_GROUP_TASKS:
            return state.setIn(['groupTasks', 'isFetching'], true)
                .setIn(['groupTasks', 'error'], '');
        case actions.FETCH_GROUP_TASKS_SUCCESS:
            const tasks = action.payload.entity._embedded ? action.payload.entity._embedded.tasks: [];
            const nextHref = '';
            const previousHref = '';
            const lastHref= '';
            const firstHref= '';
            return state.setIn(['groupTasks', 'isFetching'], false)
                .setIn(['groupTasks', 'data'], Immutable.fromJS(tasks))
                .setIn(['groupTasks', 'nextHref'], nextHref)
                .setIn(['groupTasks', 'previousHref'], previousHref)
                .setIn(['groupTasks', 'lastHref'], lastHref)
                .setIn(['groupTasks', 'firstHref'], firstHref)
        case actions.FETCH_GROUP_TASKS_FAILURE:
            return state.setIn(['groupTasks', 'isFetching'], false)
                .setIn(['groupTasks', 'error'], action.payload);
        default:
            return state;
    }
}

export default reducer;