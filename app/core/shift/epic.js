import client from "../../common/rest/client";
import * as types from "./actionTypes";
import * as actions from "./actions";
import {combineEpics} from "redux-observable";
import {errorObservable} from "../error/epicUtil";
import PubSub from "pubsub-js";


const fetchShiftForm = (action$, store) =>
    action$.ofType(types.FETCH_SHIFT_FORM)
        .mergeMap(action =>
            client({
                method: 'GET',
                path: `/api/translation/form/createAnActiveShift`,
                headers: {
                    "Accept": "application/json",
                    "Authorization": `Bearer ${store.getState().keycloak.token}`
                }
            }).map(payload => actions.fetchShiftFormSuccess(payload))
                .catch(error => {
                        return errorObservable(actions.fetchShiftFormFailure(), error);
                    }
                ));

const fetchActiveShift = (action$, store) =>

    action$.ofType(types.FETCH_ACTIVE_SHIFT)
        .mergeMap(action =>
            client({
                method: 'GET',
                path: `/api/platform-data/shift?email=eq.${store.getState().keycloak.tokenParsed.email}`+
                            `&select=*,location(locationname)` +
                            `,command(commandname),team(teamname), subcommand(commandname),staff(phone)`,
                headers: {
                    "Accept": "application/json"
                }
            }).map(payload => actions.fetchActiveShiftSuccess(payload))
                .catch(error => {
                        return errorObservable(actions.fetchActiveShiftFailure(), error);
                    }
                ));


const submit = (action$, store) =>
    action$.ofType(types.SUBMIT_VALIDATION)
        .mergeMap(action =>
            client({
                method: 'POST',
                path: `/api/form/${action.formId}/submission`,
                entity: {
                    "data": action.submissionData
                },
                headers: {
                    "Accept": "application/json",
                    "Authorization": `Bearer ${store.getState().keycloak.token}`,
                    'Content-Type': 'application/json'
                }
            }).take(1).map(payload => {
                return {
                    type: types.CREATE_ACTIVE_SHIFT,
                    shiftInfo: payload.entity.data
                }
            }).catch(error => {
                    return errorObservable(actions.submitFailure(), error);
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
            }).map(payload => {
                PubSub.publish("submission", {
                    submission: true,
                    message: `Shift successfully started`
                });
                return actions.createActiveShiftSuccess(payload);
            }).catch(error => {
                    return errorObservable(actions.createActiveShiftFailure(), error);
                }
            ));

export default combineEpics(fetchActiveShift, submit, createActiveShift, fetchShiftForm);