import * as types from "./actionTypes";

const handleError = payload => ({
    type: types.HANDLE_ERROR,
    payload
});


export {
    handleError
}