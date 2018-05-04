import * as types from "./actionTypes";

const fetchComments = (url) => {
    return {
        type: types.FETCH_COMMENTS,
        url
    }
};

const fetchCommentsSuccess = (payload) => {
    return {
        type: types.FETCH_COMMENTS_SUCCESS,
        payload
    }
};

const fetchCommentsFailure =  () => {
    return {
        type: types.FETCH_COMMENTS_FAILURE
    }
};


const createComment = ({taskId, comment}) => {
    return {
        type: types.CREATE_COMMENT,
        taskId: taskId,
        comment: comment
    }
};

const createCommentSuccess = (payload) => {
    return {
        type: types.CREATE_COMMENT_SUCCESS,
        payload
    }
};

const createCommentFailure = () => {
    return {
        type: types.CREATE_COMMENT_FAILURE
    }
};

const fetchTask = (taskId) => {
    return {
        type: types.FETCH_TASK,
        taskId
    }
};

const fetchTaskSuccess = (payload) => {
    return {
        type: types.FETCH_TASK_SUCCESS,
        payload
    }
};

const fetchTaskFailure = () => {
    return {
        type: types.FETCH_TASK_FAILURE
    }
};


const fetchCreateCommentForm = () => {
    return {
        type: types.FETCH_CREATE_COMMENT_FORM
    }
};


const fetchCreateCommentFormSuccess = (payload) => {
    return {
        type: types.FETCH_CREATE_COMMENT_FORM_SUCCESS,
        payload
    }
};

const  fetchCreateCommentFormFailure = () => {
    return {
        type: types.FETCH_CREATE_COMMENT_FORM_FAILURE
    }
};


const claimTask = (taskId) => {
    return {
        type: types.CLAIM_TASK,
        taskId
    }
};

const claimTaskSuccess = (payload) => {
    return {
        type: types.CLAIM_TASK_SUCCESS,
        payload
    }
};

const claimTaskFailure = () => {
    return {
        type: types.CLAIM_TASK_FAILURE
    }
};

const unclaimTask = (taskId) => {
    return {
        type: types.UNCLAIM_TASK,
        taskId
    }
};

const unclaimTaskSuccess = (payload) => {
    return {
        type: types.UNCLAIM_TASK_SUCCESS,
        payload
    }
};

const unclaimTaskFailure = () => {
    return {
        type: types.UNCLAIM_TASK_FAILURE
    }
};


const completeTask = (taskId) => {
    return {
        type: types.COMPLETE_TASK,
        taskId
    }
};

const completeTaskSuccess = () => {
    return {
        type: types.COMPLETE_TASK_SUCCESS,
    }
};

const completeTaskFailure = () => {
    return {
        type: types.COMPLETE_TASK_FAILURE
    }
};

export {
    fetchComments,
    fetchCommentsSuccess,
    fetchCommentsFailure,
    createComment,
    createCommentSuccess,
    createCommentFailure,
    fetchTask,
    fetchTaskSuccess,
    fetchTaskFailure,
    fetchCreateCommentForm,
    fetchCreateCommentFormSuccess,
    fetchCreateCommentFormFailure,
    claimTask,
    claimTaskSuccess,
    claimTaskFailure,
    unclaimTask,
    unclaimTaskSuccess,
    unclaimTaskFailure,
    completeTask,
    completeTaskSuccess,
    completeTaskFailure
}