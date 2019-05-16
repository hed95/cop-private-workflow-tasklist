import {errorObservable} from "../../core/error/epicUtil";
import {retry} from "../../core/util/retry";
import * as types from "./actionTypes";
import * as actions from "./actions";
import {combineEpics} from "redux-observable";
import config from '../../config';

const fetchReports = (action$, store, {client}) =>
    action$.ofType(types.FETCH_REPORTS_LIST)
        .mergeMap(action =>
            client({
                method: 'GET',
                path: `${config.services.report.url}/api/reports`,
                headers: {
                    "Accept": "application/json",
                    "Authorization": `Bearer ${store.getState().keycloak.token}`
                }
            }).retryWhen(retry).map(payload => actions.fetchReportsListSuccess(payload))
                .catch(error => {
                        return errorObservable(actions.fetchReportsListFailure(), error);
                    }
                ));


export default combineEpics(fetchReports);
