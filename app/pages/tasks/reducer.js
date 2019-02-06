import Immutable from 'immutable';
import * as actions from './actionTypes';

const { Map, List } = Immutable;

export const initialState = new Map({
  yourTasks: new Map({
    isFetchingTasksAssignedToYou: false,
    tasks: new List([]),
    total: 0,
    yourTasksSortValue: 'sort=due,desc',
    yourTasksFilterValue: null
  }),
  yourGroupTasks: new Map({
    isFetchingYourGroupTasks: false,
    tasks: new List([]),
    total: 0,
    yourGroupTasksSortValue: 'sort=due,desc',
    yourGroupTasksFilterValue: null
  }),
  unassignedTasks: new Map({
    isFetchingUnassignedTasks: false,
    tasks: new List([]),
    total: 0,
    yourGroupsUnassignedTasksSortValue: 'sort=due,desc',
    yourGroupsUnassignedTasksFilterValue: null
  })
});

function reducer(state = initialState, action) {
  switch (action.type) {
    //tasks assigned to you
    case actions.FETCH_TASKS_ASSIGNED_TO_YOU:
      return state
        .setIn(['yourTasks', 'isFetchingTasksAssignedToYou'], !action.skipLoading)
        .setIn(['yourTasks', 'yourTasksFilterValue'], action.filterValue)
        .setIn(['yourTasks', 'yourTasksSortValue'], action.sortValue);
    case actions.FETCH_TASKS_ASSIGNED_TO_YOU_SUCCESS:
      const tasks = action.payload.entity._embedded ? action.payload.entity._embedded.tasks : [];
      return state
        .setIn(['yourTasks', 'isFetchingTasksAssignedToYou'], false)
        .setIn(['yourTasks', 'tasks'], Immutable.fromJS(tasks))
        .setIn(['yourTasks', 'total'], action.payload.entity.page.totalElements);
    case actions.FETCH_TASKS_ASSIGNED_TO_YOU_FAILURE:
      return state
        .setIn(['yourTasks', 'isFetchingTasksAssignedToYou'], false);

    //tasks for your group
    case actions.FETCH_YOUR_GROUP_TASKS:
      return state
        .setIn(['yourGroupTasks', 'isFetchingTasksAssignedToYou'], !action.skipLoading)
        .setIn(['yourGroupTasks', 'yourGroupTasksFilterValue'], action.filterValue)
        .setIn(['yourGroupTasks', 'yourGroupTasksSortValue'], action.sortValue);
    case actions.FETCH_YOUR_GROUP_TASKS_SUCCESS:
      const groupTasks = action.payload.entity._embedded ? action.payload.entity._embedded.tasks : [];
      const groupTasksTotal = action.payload.entity.page.totalElements;
      return state.setIn(['yourGroupTasks', 'isFetchingYourGroupTasks'], false)
        .setIn(['yourGroupTasks', 'tasks'], Immutable.fromJS(groupTasks))
        .setIn(['yourGroupTasks', 'total'], groupTasksTotal);
    case actions.FETCH_YOUR_GROUP_TASKS_FAILURE:
      return state.setIn(['yourGroupTasks', 'isFetchingYourGroupTasks'], false);

    //tasks unassigned
    case actions.FETCH_UNASSIGNED_TASKS:
      return state
        .setIn(['unassignedTasks', 'isFetchingUnassignedTasks'], !action.skipLoading)
        .setIn(['unassignedTasks', 'yourGroupsUnassignedTasksFilterValue'], action.filterValue)
        .setIn(['unassignedTasks', 'yourGroupsUnassignedTasksSortValue'], action.sortValue);
    case actions.FETCH_UNASSIGNED_TASKS_SUCCESS:
      const unassignedTasks = action.payload.entity._embedded ? action.payload.entity._embedded.tasks : [];
      const totalUnassigned = action.payload.entity.page.totalElements;
      return state.setIn(['unassignedTasks', 'isFetchingUnassignedTasks'], false)
        .setIn(['unassignedTasks', 'tasks'], Immutable.fromJS(unassignedTasks))
        .setIn(['unassignedTasks', 'total'], totalUnassigned);

    case actions.FETCH_UNASSIGNED_TASKS_FAILURE:
      return state.setIn(['unassignedTasks', 'isFetchingUnassignedTasks'], false);
    default:
      return state;
  }
}


export default reducer;
