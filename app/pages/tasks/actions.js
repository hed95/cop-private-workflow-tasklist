import * as types from './actionTypes';

const fetchGroupTasks = url => ({
    type: types.FETCH_GROUP_TASKS, url
});

const fetchGroupTasksSuccess = payload => ({
    type: types.FETCH_GROUP_TASKS_SUCCESS,
    payload
});

const fetchGroupTasksFailure = error => ({
    error: true,
    payload: error.raw.message,
    type: types.FETCH_GROUP_TASKS_FAILURE
})

export  {
    fetchGroupTasks,
    fetchGroupTasksSuccess
}