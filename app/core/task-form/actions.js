import * as types from './actionTypes';

const fetchTaskForm = (task) => ({
  type: types.FETCH_TASK_FORM,
  task
});


const fetchTaskFormSuccess = payload => ({
  type: types.FETCH_TASK_FORM_SUCCESS,
  payload
});

const fetchTaskFormFailure = () => ({
  type: types.FETCH_TASK_FROM_FAILURE
});


const submitTaskForm = (formId, taskId, submission, variableName) => ({
  type: types.SUBMIT_TASK_FORM,
  formId,
  taskId,
  submission,
  variableName
});

const submitTaskFormSuccess = (payload) => ({
  type: types.SUBMIT_TASK_FORM_SUCCESS,
  payload
});

const submitTaskFormFailure = () => ({
  type: types.SUBMIT_TASK_FORM_FAILURE
});

const completeTask = (taskId, data) => ({
  type: types.COMPLETE_TASK_FORM,
  taskId,
  data
});

const completeTaskSuccess = (payload) => ({
  type: types.COMPLETE_TASK_FORM_SUCCESS,
  payload
});

const completeTaskFailure = () => ({
  type: types.COMPLETE_TASK_FORM_FAILURE
});

const resetForm = () => ({
  type: types.RESET_FORM
});


const customEvent = (event, task, variableName) => ({
  type: types.TASK_CUSTOM_EVENT,
  event,
  task,
  variableName
});

const customEventSuccess = (payload) => ({
  type: types.TASK_CUSTOM_EVENT_SUCCESS,
  payload
});

const customEventFailure = (error, event) => ({
  type: types.TASK_CUSTOM_EVENT_FAILURE,
  error,
  event
});

export {
  fetchTaskForm,
  fetchTaskFormSuccess,
  fetchTaskFormFailure,
  submitTaskForm,
  submitTaskFormSuccess,
  submitTaskFormFailure,
  completeTask,
  completeTaskSuccess,
  completeTaskFailure,
  resetForm,
  customEvent,
  customEventFailure,
  customEventSuccess
};
