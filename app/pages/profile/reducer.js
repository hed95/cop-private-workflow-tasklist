import Immutable from 'immutable';
import * as actions from './actionTypes';

const {Map, List} = Immutable;

const initialState = new Map({
    regions: new Map({
        isFetching: false,
        data: List([]),
        error: ''
    }),
    locations: new Map({
        isFetching: false,
        error: '',
        data: List([])
    }),
    teams: new Map({
        isFetching: false,
        data: List([]),
        error: ''
    })

});

function reducer(state = initialState, action) {
    switch (action.type) {
        case actions.FETCH_REGIONS:
            return state.setIn(['regions', 'isFetching'], true)
                .setIn(['regions', 'error'], '');
        case actions.FETCH_REGIONS_SUCCESS:
            const regions = action.payload.entity._embedded ? action.payload.entity._embedded.regions: [];
            return state.setIn(['regions', 'isFetching'], false)
                .setIn(['regions', 'data'], Immutable.fromJS(regions));
        case actions.FETCH_REGIONS_FAILURE:
            return state.setIn(['regions', 'isFetching'], false)
                .setIn(['regions', 'error'], action.payload)
                .setIn(['regions', 'data'], List([]));

        case actions.FETCH_LOCATIONS:
            return state.setIn(['locations', 'isFetching'], true)
                .setIn(['locations', 'error'], '');
        case actions.FETCH_LOCATIONS_SUCCESS:
            const locations = action.payload.entity._embedded ? action.payload.entity._embedded.locations: [];
            return state.setIn(['locations', 'isFetching'], false)
                .setIn(['locations', 'data'], Immutable.fromJS(locations));
        case actions.FETCH_LOCATIONS_FAILURE:
            return state.setIn(['locations', 'isFetching'], false)
                .setIn(['locations', 'error'], action.payload)
                .setIn(['locations', 'data'], List([]));

        case actions.FETCH_TEAMS:
            return state.setIn(['teams', 'isFetching'], true)
                .setIn(['teams', 'error'], '');
        case actions.FETCH_TEAMS_SUCCESS:
            const teams = action.payload.entity._embedded ? action.payload.entity._embedded.teams: [];
            return state.setIn(['teams', 'isFetching'], false)
                .setIn(['teams', 'data'], Immutable.fromJS(teams));
        case actions.FETCH_TEAMS_FAILURE:
            return state.setIn(['teams', 'isFetching'], false)
                .setIn(['teams', 'error'], action.payload)
                .setIn(['teams', 'data'], List([]));



        default:
            return state;
    }
}

export default reducer;
