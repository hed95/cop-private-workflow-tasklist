import client from "../../common/rest/client";
import * as types from "./actionTypes";
import * as actions from "./actions";
import {combineEpics} from "redux-observable";
import {errorObservable} from "../error/epicUtil";

const fetchActiveShift = (action$, store) =>
    action$.ofType(types.FETCH_ACTIVE_SHIFT)
        .mergeMap(action =>
            client({
                method: 'GET',
                path: `/api/platform-data/shift?email=eq.${store.getState().keycloak.tokenParsed.email}`,
                headers: {
                    "Accept": "application/json"
                }
            }).map(payload => actions.fetchActiveShiftSuccess(payload))
                .catch(error => {
                        return errorObservable(actions.fetchActiveShiftFailure(), error);
                    }
                ));

const createActiveShift = (action$, store) =>
    action$.ofType(types.CREATE_ACTIVE_SHIFT)
        .mergeMap(action =>
            client({
                method: 'POST',
                entity: action.shiftInfo,
                path: `/api/workflow/shift`,
                headers: {
                    "Authorization": `Bearer ${store.getState().keycloak.token}`,
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            }).map(payload => actions.createActiveShiftSuccess(payload))
                .catch(error => {
                        return errorObservable(actions.createActiveShiftFailure(), error);
                    }
                ));

export default combineEpics(fetchActiveShift, createActiveShift);