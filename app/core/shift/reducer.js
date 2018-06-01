import Immutable from 'immutable';
import * as actions from './actionTypes';

const {Map} = Immutable;

const initialState = new Map({
    isFetchingShift: true,
    hasActiveShift: false,
    shift: null,
    submittingActiveShift: false,
    activeShiftSuccess: false,
    loadingShiftForm: true,
    shiftForm: null
});

function reducer(state = initialState, action) {
    switch (action.type) {
        case actions.FETCH_SHIFT_FORM:
            return state.set('loadingShiftForm', true)
                .set('shiftForm', null);
        case actions.FETCH_SHIFT_FORM_SUCCESS:
            const form = action.payload.entity;
            return state.set('loadingShiftForm', false)
                .set('shiftForm', form);
        case actions.FETCH_SHIFT_FORM_FAILURE:
            return state.set('loadingShiftForm', false);
        case actions.FETCH_ACTIVE_SHIFT:
            return state.set('isFetchingShift', true)
                .set('activeShiftSuccess', false);
        case actions.FETCH_ACTIVE_SHIFT_SUCCESS:
            const data = action.payload.entity;
            const hasShiftInfo = data && data.length !== 0;
            const shiftInfo = hasShiftInfo? Immutable.fromJS(data[0]) : null;
            return state.set('isFetchingShift', false)
                .set('hasActiveShift', hasShiftInfo)
                .set('shift', shiftInfo);
        case actions.FETCH_ACTIVE_SHIFT_FAILURE:
            return state.set('isFetchingShift', false)
                .set('shift', null)
                .set('hasActiveShift', false);
        case actions.CREATE_ACTIVE_SHIFT:
            return state.set('submittingActiveShift', true)
                .set('activeShiftSuccess', false);
        case actions.CREATE_ACTIVE_SHIFT_SUCCESS:
            return state.set('submittingActiveShift', false)
                .set('activeShiftSuccess', true)
                .set('hasActiveShift', true);
        case actions.CREATE_ACTIVE_SHIFT_FAILURE:
            return state
                .set("submittingActiveShift", false)
                .set('activeShiftSuccess', false);
        default:
            return state;
    }
}


export default reducer;
