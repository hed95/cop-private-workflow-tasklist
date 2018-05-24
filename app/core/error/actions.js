import * as types from "./actionTypes";

const handleError = payload => ({
    type: types.HANDLE_ERROR,
    payload
});

const handleAuthorised = () => ({
    type: types.HANDLE_AUTHORISED
});

export {
    handleError,
    handleAuthorised
}