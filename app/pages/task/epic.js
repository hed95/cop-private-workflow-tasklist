import client from "../../common/rest/client";
import {errorObservable} from "../../core/error/epicUtil";
import * as types from "./actionTypes";
import * as actions from "./actions";
import {combineEpics} from "redux-observable";


const fetchComments = (action$, store) =>
    action$.ofType(types.FETCH_COMMENTS)
        .mergeMap(action =>
            client({
                method: 'GET',
                path: `${action.url}`,
                headers: {
                    "Accept": "application/json",
                    "Authorization": `Bearer ${store.getState().keycloak.token}`
                }
            }).map(payload => actions.fetchCommentsSuccess(payload))
                .catch(error => {
                        return errorObservable(actions.fetchCommentsFailure(), error);
                    }
                ));


const fetchTask = (action$, store) =>
    action$.ofType(types.FETCH_TASK)
        .mergeMap(action => client({
            method: 'GET',
            path: `/api/workflow/tasks/${action.taskId}`,
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${store.getState().keycloak.token}`
            }
        }).map(payload => actions.fetchTaskSuccess(payload))
            .catch(error => {
                    return errorObservable(actions.fetchTaskFailure(), error);
                }
            ));


const fetchCreateCommentForm = (action$, store) =>
    action$.ofType(types.FETCH_CREATE_COMMENT_FORM)
        .mergeMap(action =>
            client({
                method: 'GET',
                path: `/api/translation/form/createAComment`,
                headers: {
                    "Accept": "application/json",
                    "Authorization": `Bearer ${store.getState().keycloak.token}`
                }
            }).map(payload => actions.fetchCreateCommentFormSuccess(payload))
                .catch(error => {
                        return errorObservable(actions.fetchCreateCommentFormFailure(), error);
                    }
                ));

const createComment = (action$, store) =>
    action$.ofType(types.CREATE_COMMENT)
        .mergeMap(action =>
            client({
                method: 'POST',
                entity: {
                    "userId": action.comment.userId,
                    "message": action.comment.message,
                    "time": new Date(action.comment.time),
                    "taskId": action.taskId
                },
                path: `/api/workflow/tasks/comments`,
                headers: {
                    "Accept": "application/json",
                    "Content-Type" : "application/json",
                    "Authorization": `Bearer ${store.getState().keycloak.token}`
                },
            }).map(payload => actions.createCommentSuccess(payload))
                .catch(error => {
                        return errorObservable(actions.createCommentFailure(), error);
                    }
                ));


export default combineEpics(fetchComments, fetchTask, createComment, fetchCreateCommentForm)