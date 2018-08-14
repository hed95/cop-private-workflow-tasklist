import * as types from "./actionTypes";



const fetchTaskCounts = () => {
    return {
        type: types.FETCH_TASK_COUNTS
    }
};

const setDefaultCounts = () => {
    return {
        type: types.SET_DEFAULT_COUNTS
    }
};

const fetchTaskCountsSuccess = (payload) => {
    return {
        type: types.FETCH_TASK_COUNTS_SUCCESS,
        payload
    }
};

const fetchTaskCountsFailure = () => {
    return {
        type: types.FETCH_TASK_COUNTS_FAILURE
    }
};

const fetchMessageCounts = () => {
    return {
        type: types.FETCH_NOTIFICATIONS_COUNT
    }
};
const fetchMessageCountsSuccess = (payload) => {
    return {
        type: types.FETCH_NOTIFICATIONS_COUNT_SUCCESS,
        payload
    }
};
const fetchMessageCountsFailure = () => {
    return {
        type: types.FETCH_NOTIFICATIONS_COUNT_FAILURE
    }
};


export {
    fetchTaskCounts,
    fetchTaskCountsSuccess,
    fetchTaskCountsFailure,
    fetchMessageCounts,
    fetchMessageCountsSuccess,
    fetchMessageCountsFailure,
    setDefaultCounts
}