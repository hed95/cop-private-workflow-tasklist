import * as types from './actionTypes';

const handleError = payload => ({
  type: types.HANDLE_ERROR,
  payload
});

const handleUnauthorised = () => ({
  type: types.HANDLE_UNAUTHORISED
});

const resetErrors = () => ({
  type: types.RESET_ERROR
});
const logError = (payload) => ({
  type: types.LOG_ERROR,
  payload
});


const logErrorSuccess =() => ({
  type: types.LOG_ERROR_SUCCESS
});
const logErrorFailure =() => ({
  type: types.LOG_ERROR_FAILURE
});
export {
  handleError,
  handleUnauthorised,
  resetErrors,
  logError,
  logErrorFailure,
  logErrorSuccess
};
