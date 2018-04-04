import Immutable from 'immutable';
import * as actions from './actionTypes';

const {Map} = Immutable;

const initialState = new Map({
    isFetching: true,
    hasActiveSession: false,
    activeSession : Map({}),
    error: '',
    submitting: false
});

function reducer(state = initialState, action) {
    switch (action.type) {
        case actions.FETCH_ACTIVE_SESSION:
            return state.set('isFetching', true);
        case actions.FETCH_ACTIVE_SESSION_SUCCESS:
           const data = action.payload.entity;
           return state.set('isFetching', false)
               .set('hasActiveSession', data && data.length !== 0)
                .set('activeSession', Immutable.fromJS(data[0]));
        case actions.FETCH_ACTIVE_SESSION_FAILURE:
            return state.set('isFetching', false)
                .set('hasActiveSession', false)
                .set('error', action.payload);
        case actions.CREATE_ACTIVE_SESSION:
            return state.set('submitting', true);
        case actions.CREATE_ACTIVE_SESSION_SUCCESS:
            return state.set('submitting', false)
                .set('activeSession', action.payload.entity);
        case actions.CREATE_ACTIVE_SESSION_FAILURE:
            return state.set("submitting", false)
                .set('error', action.payload);
        default:
            return state;
    }
}

export default reducer;
