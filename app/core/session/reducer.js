import Immutable from 'immutable';
import * as actions from './actionTypes';

const {Map} = Immutable;

const initialState = new Map({
    isFetchingActiveSession: true,
    hasActiveSession: false,
    activeSession: Map({}),
    activeSessionError: null,
    submittingActiveSession: false,
    activeSubmissionSuccess: false
});

function reducer(state = initialState, action) {
    switch (action.type) {
        case actions.FETCH_ACTIVE_SESSION:
            return state.set('isFetchingActiveSession', true)
                .set('activeSubmissionSuccess', false)
                .set('activeSessionError', null);
        case actions.FETCH_ACTIVE_SESSION_SUCCESS:
            const data = action.payload.entity;
            return state.set('isFetchingActiveSession', false)
                .set('hasActiveSession', data && data.length !== 0)
                .set('activeSession', Immutable.fromJS(data[0]));
        case actions.FETCH_ACTIVE_SESSION_FAILURE:
            return state.set('isFetchingActiveSession', false)
                .set('hasActiveSession', false)
                .set('activeSessionError', action.payload);
        case actions.CREATE_ACTIVE_SESSION:
            return state.set('submittingActiveSession', true)
                .set('activeSubmissionSuccess', false)
                .set('activeSessionError', null);
        case actions.CREATE_ACTIVE_SESSION_SUCCESS:
            return state.set('submittingActiveSession', false)
                .set('activeSubmissionSuccess', true)
                .set('hasActiveSession', true)
                .set('activeSession', action.payload.entity);
        case actions.CREATE_ACTIVE_SESSION_FAILURE:
            let message;
            if (action.payload.entity) {
                message = action.payload.entity;
            } else {
                message = `Submission to create an active session failed. Cause:${action.payload.status.code}:${action.payload.status.text}`
            }
            return state
                .set("submittingActiveSession", false)
                .set('activeSubmissionSuccess', false)
                .set('activeSessionError', message);
        default:
            return state;
    }
}


export default reducer;
