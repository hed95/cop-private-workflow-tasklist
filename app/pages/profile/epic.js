import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/merge';
import {combineEpics} from 'redux-observable';
import client from '../../common/rest/client';

import * as types from './actionTypes';
import * as actions from './actions';

const fetchRegions = action$ =>
    action$.ofType(types.FETCH_REGIONS)
        .mergeMap(action =>
            client({
                method: 'GET',
                path: `/api/reference-data/regions?query=${action.query}`
            }).map(payload => actions.fetchRegionsSuccess(payload))
                .catch(error => Observable.of(actions.fetchRegionsFailure(error)))
        );

const fetchLocations = action$ =>
    action$.ofType(types.FETCH_LOCATIONS)
        .mergeMap(action =>
            client({
                method: 'GET',
                path: action.url
            }).map(payload => actions.fetchLocationSuccess(payload))
                .catch(error => Observable.of(actions.fetchLocationsFailure(error)))
        );

const fetchTeams = action$ =>
    action$.ofType(types.FETCH_TEAMS)
        .mergeMap(action =>
            client({
                method: 'GET',
                path: action.url
            }).map(payload => actions.fetchTeamSuccess(payload))
                .catch(error => Observable.of(actions.fetchTeamFailure(error)))
        );



export default combineEpics(fetchRegions, fetchLocations, fetchTeams);
