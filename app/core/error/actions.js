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
const log = (payload) => ({
  type: types.LOG,
  payload
});


const logSuccess =() => ({
  type: types.LOG_SUCCESS
});
const logFailure =() => ({
  type: types.LOG_FAILURE
});
export {
  handleError,
  handleUnauthorised,
  resetErrors,
  log,
  logSuccess,
  logFailure
};
