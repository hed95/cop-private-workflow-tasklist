import * as types from "./actionTypes";

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

export {
    handleError,
    handleUnauthorised,
    resetErrors
}