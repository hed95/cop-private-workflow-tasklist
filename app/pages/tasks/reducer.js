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
    original: new List([]),
    total: 0,
    sortValue: 'sort=due,desc'
  }),
  unassignedTasks: new Map({
    isFetchingUnassignedTasks: false,
    tasks: new List([]),
    total: 0,
    sortValue: 'sort=due,desc',
    original: new List([])
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

    case actions.FETCH_YOUR_GROUP_TASKS:
      return state.setIn(['yourGroupTasks', 'isFetchingYourGroupTasks'], true);
    case actions.FETCH_YOUR_GROUP_TASKS_SUCCESS:
      const groupTasks = action.payload.entity._embedded ? action.payload.entity._embedded.tasks : [];
      const groupTasksTotal = action.payload.entity.page.totalElements;
      return state.setIn(['yourGroupTasks', 'isFetchingYourGroupTasks'], false)
        .setIn(['yourGroupTasks', 'tasks'], Immutable.fromJS(groupTasks))
        .setIn(['yourGroupTasks', 'total'], groupTasksTotal)
        .setIn(['yourGroupTasks', 'original'], Immutable.fromJS(groupTasks));
    case actions.FETCH_YOUR_GROUP_TASKS_FAILURE:
      return state.setIn(['yourGroupTasks', 'isFetchingYourGroupTasks'], false);


    case actions.FETCH_UNASSIGNED_TASKS:
      return state.setIn(['unassignedTasks', 'isFetchingUnassignedTasks'], true);
    case actions.FETCH_UNASSIGNED_TASKS_SUCCESS:
      const unassignedTasks = action.payload.entity._embedded ? action.payload.entity._embedded.tasks : [];
      const totalUnassigned = action.payload.entity.page.totalElements;
      return state.setIn(['unassignedTasks', 'isFetchingUnassignedTasks'], false)
        .setIn(['unassignedTasks', 'tasks'], Immutable.fromJS(unassignedTasks))
        .setIn(['unassignedTasks', 'total'], totalUnassigned)
        .setIn(['unassignedTasks', 'original'], Immutable.fromJS(unassignedTasks));

    case actions.FETCH_UNASSIGNED_TASKS_FAILURE:
      return state.setIn(['unassignedTasks', 'isFetchingUnassignedTasks'], false);
    case actions.SET_YOUR_GROUP_TASKS_SORT_VALUE:
      return state.setIn(['yourGroupTasks', 'sortValue'], action.value);

    case actions.SET_UNASSIGNED_TASKS_SORT_VALUE:
      return state.setIn(['unassignedTasks', 'sortValue'], action.value);

    case actions.FILTER_GROUP_YOUR_TASKS_BY_NAME:
      const filterValue = action.value.toLowerCase();
      if (filterValue) {
        const originalGroupTasks = state.getIn(['yourGroupTasks', 'original']);
        const updatedGroupTasks = originalGroupTasks.filter((task) => {
          const taskName = task.getIn(['task', 'name']);
          const assigneeName = task.getIn(['task', 'assignee']);
          return taskName.toLowerCase()
              .includes(filterValue) ||
            (assigneeName ? assigneeName.includes(filterValue) : false);
        });
        return state.setIn(['yourGroupTasks', 'tasks'], updatedGroupTasks);
      } else {
        return state.setIn(['yourGroupTasks', 'tasks'],
          state.getIn(['yourGroupTasks', 'original']));
      }
    case actions.FILTER_GROUP_UNASSIGNED_TASKS_BY_NAME:
      const unassignedFilterValue = action.value.toLowerCase();
      if (unassignedFilterValue) {
        const originalGroupTasks = state.getIn(['unassignedTasks', 'original']);
        const updatedGroupTasks = originalGroupTasks.filter((task) => {
          const taskName = task.getIn(['task', 'name']);
          return taskName.toLowerCase()
            .includes(unassignedFilterValue);
        });
        return state.setIn(['unassignedTasks', 'tasks'], updatedGroupTasks);
      } else {
        return state.setIn(['unassignedTasks', 'tasks'],
          state.getIn(['unassignedTasks', 'original']));
      }
    default:
      return state;
  }
}


export default reducer;
