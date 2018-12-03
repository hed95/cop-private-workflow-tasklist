import {errorObservable} from "../../core/error/epicUtil";
import {retryOnForbidden} from "../../core/util/retry";
import * as types from "./actionTypes";
import * as actions from "./actions";
import {combineEpics} from "redux-observable";

const fetchReports = (action$, store, {client}) =>
    action$.ofType(types.FETCH_REPORTS_LIST)
        .mergeMap(action =>
            client({
                method: 'GET',
                path: `/api/reports`,
                headers: {
                    "Accept": "application/json",
                    "Authorization": `Bearer ${store.getState().keycloak.token}`
                }
            }).retryWhen(retryOnForbidden).map(payload => actions.fetchReportsListSuccess(payload))
                .catch(error => {
                        return errorObservable(actions.fetchReportsListFailure(), error);
                    }
                ));


export default combineEpics(fetchReports);
