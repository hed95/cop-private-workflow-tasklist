import Immutable from 'immutable';
import * as actions from './actionTypes';

const {Map} = Immutable;

const initialState = new Map({
    isFetching: true,
    hasActiveSession: false,
    sessionInfo : Map({}),
    error: ''
});

function reducer(state = initialState, action) {
    switch (action.type) {
        case actions.FETCH_ACTIVE_SESSION:
            return state.set('isFetching', true);
        case actions.FETCH_ACTIVE_SESSION_SUCCESS:
           const data = action.payload.entity;
           return state.set('isFetching', false)
               .set('hasActiveSession', data && data.length !== 0)
                .set('sessionInfo', Immutable.fromJS(data[0]));
        case actions.FETCH_ACTIVE_SESSION_FAILURE:
            return state.set('isFetching', false).set('error', action.payload);
        default:
            return state;
    }
}

export default reducer;
