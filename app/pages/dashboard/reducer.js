import Immutable from 'immutable';
import * as actions from './actionTypes';

const {Map} = Immutable;

const initialState = new Map({
    taskCounts: new Map({
        'tasksAssignedToUser' : 0,
        'tasksUnassigned' : 0,
        'totalTasksAllocatedToTeam': 0
    }),
    isFetchingTaskCounts: true,
    messageCounts: new Map({}),
    isFetchingMessageCounts: true
});

function reducer(state = initialState, action) {
    switch (action.type) {
        case actions.FETCH_TASK_COUNTS:
            return state.set('isFetchingTaskCounts', true);
        case actions.FETCH_TASK_COUNTS_SUCCESS:
            return state.set('isFetchingTaskCounts', false)
                .set('taskCounts', Immutable.fromJS(action.payload.entity));
        case actions.FETCH_TASK_COUNTS_FAILURE:
            return state.set('isFetchingTaskCounts', true);
        case actions.FETCH_NOTIFICATIONS_COUNT:
            return state.set('isFetchingMessageCounts', true);
        case actions.FETCH_NOTIFICATIONS_COUNT_SUCCESS:
            return state.set('isFetchingMessageCounts', false)
                .set('messageCounts', Immutable.fromJS(action.payload.entity));
        case actions.FETCH_NOTIFICATIONS_COUNT_FAILURE:
            return state.set('isFetchingMessageCounts', false);
        case actions.SET_DEFAULT_COUNTS:
            return initialState.setIn(['messageCounts', 'page', 'totalElements'], 0);
          default:
            return state;
    }
}


export default reducer;
