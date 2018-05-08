import Immutable from 'immutable';
import * as actions from './actionTypes';

const {Map, List} = Immutable;

const initialState = new Map({
    myTasks: new Map({
        isFetchingTasksAssignedToMe: false,
        tasks: new List([]),
        total: 0
    }),
    myGroupTasks: new Map({
        isFetchingMyGroupTasks: false,
        tasks: new List([]),
        total: 0
    }),
    unassignedTasks: new Map({
        isFetchingUnassignedTasks: false,
        tasks: new List([]),
        total: 0
    }),
    taskCounts: new Map({}),
    isFetchingTaskCounts: false,
    tabIndex: 0
});

function reducer(state = initialState, action) {
    switch (action.type) {
        //fetch tasks assigned to me
        case actions.FETCH_TASKS_ASSIGNED_TO_ME:
            return state.setIn(['myTasks', 'isFetchingTasksAssignedToMe'], true);
        case actions.FETCH_TASKS_ASSIGNED_TO_ME_SUCCESS:
            const tasks = action.payload.entity._embedded ? action.payload.entity._embedded.tasks : [];
            const total = action.payload.entity.page.totalElements;
            return state.setIn(['myTasks', 'isFetchingTasksAssignedToMe'], false)
                .setIn(['myTasks', 'tasks'], Immutable.fromJS(tasks))
                .setIn(['myTasks', 'total'], total);
        case actions.FETCH_TASKS_ASSIGNED_TO_ME_FAILURE:
            return state.set(['myTasks', 'isFetchingTasksAssignedToMe'], false);


        case actions.FETCH_MY_GROUP_TASKS:
            return state.setIn(['myGroupTasks', 'isFetchingMyGroupTasks'], true);
        case actions.FETCH_MY_GROUP_TASKS_SUCCESS:
            const groupTasks = action.payload.entity._embedded ? action.payload.entity._embedded.tasks : [];
            const groupTasksTotal = action.payload.entity.page.totalElements;
            return state.setIn(['myGroupTasks', 'isFetchingMyGroupTasks'], false)
                .setIn(['myGroupTasks', 'tasks'], Immutable.fromJS(groupTasks))
                .setIn(['myGroupTasks', 'total'], groupTasksTotal);
        case actions.FETCH_MY_GROUP_TASKS_FAILURE:
            return state.setIn(['myGroupTasks', 'isFetchingMyGroupTasks'], false);

        case actions.FETCH_UNASSIGNED_TASKS:
            return state.setIn(['unassignedTasks', 'isFetchingUnassignedTasks'], true);
        case actions.FETCH_UNASSIGNED_TASKS_SUCCESS:
            const unassignedTasks = action.payload.entity._embedded ? action.payload.entity._embedded.tasks : [];
            const totalUnassigned = action.payload.entity.page.totalElements;
            return state.setIn(['unassignedTasks', 'isFetchingUnassignedTasks'], false)
                .setIn(['unassignedTasks', 'tasks'], Immutable.fromJS(unassignedTasks))
                .setIn(['unassignedTasks', 'total'], totalUnassigned);
        case actions.FETCH_UNASSIGNED_TASKS_FAILURE:
            return state.setIn(['unassignedTasks', 'isFetchingUnassignedTasks'], false);

        case actions.FETCH_TASK_COUNTS:
            return state.set('isFetchingTaskCounts', true);
        case actions.FETCH_TASK_COUNTS_SUCCESS:
            return state.set('isFetchingTaskCounts', false)
                .set('taskCounts', Immutable.fromJS(action.payload.entity));
        case actions.FETCH_TASK_COUNTS_FAILURE:
            return state.set('isFetchingTaskCounts', true);

        case actions.SET_TAB_INDEX:
            return state.set('tabIndex', action.index);
        default:
            return state;
    }
}


export default reducer;
