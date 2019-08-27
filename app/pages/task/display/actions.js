import * as types from './actionTypes';

const fetchComments = url => ({
  type: types.FETCH_COMMENTS,
  url,
});

const fetchCommentsSuccess = payload => ({
  type: types.FETCH_COMMENTS_SUCCESS,
  payload,
});

const fetchCommentsFailure = () => ({
  type: types.FETCH_COMMENTS_FAILURE,
});

const createComment = ({ taskId, comment }) => ({
  type: types.CREATE_COMMENT,
  taskId,
  comment,
});

const updateDueDate = ({ taskId, dueDate }) => ({
  type: types.UPDATE_DUE_DATE,
  taskId,
  dueDate,
});

const updateDueDateSuccess = () => ({
  type: types.UPDATE_DUE_DATE_SUCCESS,
});
const updateDueDateFailure = () => ({
  type: types.UPDATE_DUE_DATE_FAILURE,
});
const createCommentSuccess = payload => ({
  type: types.CREATE_COMMENT_SUCCESS,
  payload,
});

const createCommentFailure = () => ({
  type: types.CREATE_COMMENT_FAILURE,
});

const fetchTask = taskId => ({
  type: types.FETCH_TASK,
  taskId,
});

const fetchTaskSuccess = payload => ({
  type: types.FETCH_TASK_SUCCESS,
  payload,
});

const fetchTaskFailure = () => ({
  type: types.FETCH_TASK_FAILURE,
});


const fetchCreateCommentForm = () => ({
  type: types.FETCH_CREATE_COMMENT_FORM,
});


const fetchCreateCommentFormSuccess = payload => ({
  type: types.FETCH_CREATE_COMMENT_FORM_SUCCESS,
  payload,
});

const fetchCreateCommentFormFailure = () => ({
  type: types.FETCH_CREATE_COMMENT_FORM_FAILURE,
});


const claimTask = taskId => ({
  type: types.CLAIM_TASK,
  taskId,
});

const claimTaskSuccess = payload => ({
  type: types.CLAIM_TASK_SUCCESS,
  payload,
});

const claimTaskFailure = () => ({
  type: types.CLAIM_TASK_FAILURE,
});

const unclaimTask = taskId => ({
  type: types.UNCLAIM_TASK,
  taskId,
});

const unclaimTaskSuccess = payload => ({
  type: types.UNCLAIM_TASK_SUCCESS,
  payload,
});

const unclaimTaskFailure = () => ({
  type: types.UNCLAIM_TASK_FAILURE,
});


const completeTask = taskId => ({
  type: types.COMPLETE_TASK,
  taskId,
});

const completeTaskSuccess = () => ({
  type: types.COMPLETE_TASK_SUCCESS,
});

const completeTaskFailure = () => ({
  type: types.COMPLETE_TASK_FAILURE,
});

const clearTask = () => ({
  type: types.CLEAR_TASK,
});

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
  completeTaskFailure,
  clearTask,
  updateDueDate,
  updateDueDateSuccess,
  updateDueDateFailure,
};
