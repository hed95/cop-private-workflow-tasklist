import * as types from "./actionTypes";

const fetchTasksAssignedToYou = (url) => {
    return {
        type: types.FETCH_TASKS_ASSIGNED_TO_YOU,
        url
    }
};

const fetchTasksAssignedToYouSuccess = (payload) => {
    return {
        type: types.FETCH_TASKS_ASSIGNED_TO_YOU_SUCCESS,
        payload
    }
};

const fetchTasksAssignedToYouFailure = () => {
    return {
        type: types.FETCH_TASKS_ASSIGNED_TO_YOU_FAILURE
    }
};


const fetchYourGroupTasks = (url) => {
    return {
        type: types.FETCH_YOUR_GROUP_TASKS,
        url
    }
};

const fetchYourGroupTasksSuccess = (payload) => {
    return {
        type: types.FETCH_YOUR_GROUP_TASKS_SUCCESS,
        payload
    }
};

const fetchYourGroupTasksFailure = () => {
    return {
        type: types.FETCH_YOUR_GROUP_TASKS_FAILURE
    }
};


const fetchUnassignedTasks = (url) => {
    return {
        type: types.FETCH_UNASSIGNED_TASKS,
        url
    }
};

const fetchUnassignedTasksSuccess = (payload) => {
    return {
        type: types.FETCH_UNASSIGNED_TASKS_SUCCESS,
        payload
    }
};

const fetchUnassignedTasksFailure = () => {
    return {
        type: types.FETCH_UNASSIGNED_TASKS_FAILURE
    }
};

const filterYourTasksByName = (value) => {
    return {
        type: types.FILTER_YOUR_TASKS_BY_NAME,
        value
    }
};
const setYourTasksSortValue = (value) => {
  return {
    type: types.SET_YOUR_TASKS_SORT_VALUE,
    value
  }
};

const setYourGroupTasksSortValue = (value) => {
  return {
    type: types.SET_YOUR_GROUP_TASKS_SORT_VALUE,
    value
  }
};

const filterYourGroupTasksByName = (value) => {
  return {
    type: types.FILTER_GROUP_YOUR_TASKS_BY_NAME,
    value
  }
};

const setUnassignedTasksSortValue = (value) => {
  return {
    type: types.SET_UNASSIGNED_TASKS_SORT_VALUE,
    value
  }
};

const filterUnassignedTasksByName = (value) => {
  return {
    type: types.FILTER_GROUP_UNASSIGNED_TASKS_BY_NAME,
    value
  }
};


export {
    fetchTasksAssignedToYou,
    fetchTasksAssignedToYouSuccess,
    fetchTasksAssignedToYouFailure,
    fetchYourGroupTasks,
    fetchYourGroupTasksSuccess,
    fetchYourGroupTasksFailure,
    fetchUnassignedTasks,
    fetchUnassignedTasksSuccess,
    fetchUnassignedTasksFailure,
    filterYourTasksByName,
    setYourTasksSortValue,
    setYourGroupTasksSortValue,
    filterYourGroupTasksByName,
    filterUnassignedTasksByName,
    setUnassignedTasksSortValue
}
