import client from "../../common/rest/client";
import * as types from "./actionTypes";
import * as actions from "./actions";
import {Observable} from "rxjs/Observable";
import {combineEpics} from "redux-observable";

const fetchActiveSession = (action$, store) =>
    action$.ofType(types.FETCH_ACTIVE_SESSION)
        .mergeMap(action =>
            client({
                method: 'GET',
                path: `/api/reference-data/activesession?email=${store.getState().keycloak.tokenParsed.email}`
            }).map(payload => actions.fetchActiveSessionSuccess(payload))
                .catch(error => Observable.of(actions.fetchActiveSessionFailure(error)))
        );


export default combineEpics(fetchActiveSession);