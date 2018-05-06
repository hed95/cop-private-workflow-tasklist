import * as types from "./actionTypes";
import * as actions from "./actions";
import {errorObservable} from "../error/epicUtil";
import client from "../../common/rest/client";
import {combineEpics} from "redux-observable";

const fetchTaskForm = (action$, store) =>
    action$.ofType(types.FETCH_TASK_FORM)
        .mergeMap(action =>
            client({
                method: 'GET',
                path: `/api/translation/form/${action.task.get('formKey')}?taskId=${action.task.get('id')}&processInstanceId=${action.task.get('processInstanceId')}`,
                headers: {
                    "Accept": "application/json",
                    "Authorization": `Bearer ${store.getState().keycloak.token}`
                }
            }).map(payload => actions.fetchTaskFormSuccess(payload))
                .catch(error => {
                        return errorObservable(actions.fetchTaskFormFailure(), error);
                    }
                ));


export default combineEpics(fetchTaskForm);