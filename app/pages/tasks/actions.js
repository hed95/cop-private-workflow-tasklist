import * as types from "./actionTypes";

const fetchTasksAssignedToMe = (url) => {
    return {
        type: types.FETCH_TASKS_ASSIGNED_TO_ME,
        url
    }
};

const fetchTasksAssignedToMeSuccess = (payload) => {
    return {
        type: types.FETCH_TASKS_ASSIGNED_TO_ME_SUCCESS,
        payload
    }
};

const fetchTasksAssignedToMeFailure = () => {
    return {
        type: types.FETCH_TASKS_ASSIGNED_TO_ME_FAILURE
    }
};


const fetchMyGroupTasks = (url) => {
    return {
        type: types.FETCH_MY_GROUP_TASKS,
        url
    }
};

const fetchMyGroupTasksSuccess = (payload) => {
    return {
        type: types.FETCH_MY_GROUP_TASKS_SUCCESS,
        payload
    }
};

const fetchMyGroupTasksFailure = () => {
    return {
        type: types.FETCH_MY_GROUP_TASKS_FAILURE
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



export {
    fetchTasksAssignedToMe,
    fetchTasksAssignedToMeSuccess,
    fetchTasksAssignedToMeFailure,
    fetchMyGroupTasks,
    fetchMyGroupTasksSuccess,
    fetchMyGroupTasksFailure,
    fetchUnassignedTasks,
    fetchUnassignedTasksSuccess,
    fetchUnassignedTasksFailure
}