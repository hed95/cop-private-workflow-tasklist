import Immutable from 'immutable';
import * as actions from './actionTypes';

const {Map} = Immutable;

const initialState = new Map({
    isFetchingShift: true,
    hasActiveShift: false,
    shift: Map({}),
    submittingActiveShift: false,
    activeShiftSuccess: false
});

function reducer(state = initialState, action) {
    switch (action.type) {
        case actions.FETCH_ACTIVE_SHIFT:
            return state.set('isFetchingShift', true)
                .set('activeShiftSuccess', false);
        case actions.FETCH_ACTIVE_SHIFT_SUCCESS:
            const data = action.payload.entity;
            return state.set('isFetchingShift', false)
                .set('hasActiveShift', data && data.length !== 0)
                .set('shift', Immutable.fromJS(data[0]));
        case actions.FETCH_ACTIVE_SHIFT_FAILURE:
            return state.set('isFetchingShift', false)
                .set('hasActiveShift', false);
        case actions.CREATE_ACTIVE_SHIFT:
            return state.set('submittingActiveShift', true)
                .set('activeShiftSuccess', false);
        case actions.CREATE_ACTIVE_SHIFT_SUCCESS:
            return state.set('submittingActiveShift', false)
                .set('activeShiftSuccess', true)
                .set('hasActiveShift', true)
                .set('shift', action.payload.entity);
        case actions.CREATE_ACTIVE_SHIFT_FAILURE:
            return state
                .set("submittingActiveShift", false)
                .set('activeShiftSuccess', false);
        default:
            return state;
    }
}


export default reducer;
