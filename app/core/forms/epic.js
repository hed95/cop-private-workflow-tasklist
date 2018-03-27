import client from "../../common/rest/client";
import {combineEpics} from "redux-observable";
import * as actions from "./actions";
import {Observable} from "rxjs/Observable";
import * as types from "./actionTypes";


const fetchForm = (action$, store) =>
    action$.ofType(types.FETCH_FORM)
        .mergeMap(action =>
            client({
                method: 'GET',
                path: `/api/form?name=${action.formName}`,
                headers: {
                    "Accept": "application/json",
                    "Authorization": `Bearer ${store.getState().keycloak.token}`
                }
            }).map(payload => actions.fetchFormSuccess(payload))
                .catch(error => Observable.of(actions.fetchFormFailure(error)))
        );


export default combineEpics(fetchForm);