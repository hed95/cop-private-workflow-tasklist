import * as types from './actionTypes';

const fetchTasksAssignedToYou = (sortValue, filterValue, skipLoading) => {
  return {
    type: types.FETCH_TASKS_ASSIGNED_TO_YOU,
    sortValue,
    filterValue,
    skipLoading
  };
};

const fetchTasksAssignedToYouSuccess = (payload) => {
  return {
    type: types.FETCH_TASKS_ASSIGNED_TO_YOU_SUCCESS,
    payload
  };
};

const fetchTasksAssignedToYouFailure = () => {
  return {
    type: types.FETCH_TASKS_ASSIGNED_TO_YOU_FAILURE
  };
};


const fetchYourGroupTasks = (sortValue, filterValue, skipLoading) => {
  return {
    type: types.FETCH_YOUR_GROUP_TASKS,
    sortValue,
    filterValue,
    skipLoading
  };
};

const fetchYourGroupTasksSuccess = (payload) => {
  return {
    type: types.FETCH_YOUR_GROUP_TASKS_SUCCESS,
    payload
  };
};

const fetchYourGroupTasksFailure = () => {
  return {
    type: types.FETCH_YOUR_GROUP_TASKS_FAILURE
  };
};

const handleUnclaim = (taskId) => {
  return {
    type: types.HANDLE_UNCLAIM,
    taskId
  }
};

export {
  fetchTasksAssignedToYou,
  fetchTasksAssignedToYouSuccess,
  fetchTasksAssignedToYouFailure,
  fetchYourGroupTasks,
  fetchYourGroupTasksSuccess,
  fetchYourGroupTasksFailure,
  handleUnclaim
};
