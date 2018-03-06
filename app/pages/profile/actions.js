import * as types from './actionTypes';

const fetchRegions = (query) => ({
    type: types.FETCH_REGIONS, query
});

const fetchRegionsSuccess = payload => ({
    type: types.FETCH_REGIONS_SUCCESS, payload
});

const fetchRegionsFailure = error => ({
    type: types.FETCH_REGIONS_FAILURE,
    error: true,
    payload: error.raw.message
});

const fetchLocations = (url) => ({
    type: types.FETCH_LOCATIONS, url
});

const fetchLocationSuccess = payload => ({
    type: types.FETCH_LOCATIONS_SUCCESS, payload
});

const fetchLocationsFailure = error => ({
    type: types.FETCH_LOCATIONS_FAILURE,
    error: true,
    payload: error.raw.message
});

const fetchTeams = (url) => ({
    type: types.FETCH_TEAMS, url
});

const fetchTeamSuccess = payload => ({
    type: types.FETCH_TEAMS_SUCCESS, payload
});

const fetchTeamFailure = error => ({
    type: types.FETCH_TEAMS_FAILURE,
    error: true,
    payload: error.raw.message
})

export {
    fetchRegions,
    fetchRegionsSuccess,
    fetchRegionsFailure,
    fetchLocations,
    fetchLocationSuccess,
    fetchLocationsFailure,
    fetchTeams,
    fetchTeamSuccess,
    fetchTeamFailure
}