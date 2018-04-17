import client from "../../common/rest/client";
import * as types from "./actionTypes";
import * as actions from "./actions";
import {Observable} from "rxjs/Observable";
import {combineEpics} from "redux-observable";



const fetchPerson = (action$, store) =>
    action$.ofType(types.FETCH_PERSON)
        .mergeMap(action =>
            client({
                method: 'GET',
                path: `/reference-data/staffattributes?_join=inner:person:staffattributes.personid:$eq:person.personid&staffattributes.email=${store.getState().keycloak.tokenParsed.email}`,
                headers: {
                    "Accept": "application/json",
                    "Authorization": `Bearer ${store.getState().keycloak.token}`
                }
            }).map(payload => actions.fetchPersonSuccess(payload))
                .catch(error => Observable.of(actions.fetchPersonFailure(error))));


export default combineEpics(fetchPerson);