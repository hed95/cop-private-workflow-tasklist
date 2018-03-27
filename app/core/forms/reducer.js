import Immutable from 'immutable';
import * as actions from './actionTypes';

const {Map} = Immutable;

const initialState = new Map({
    isFetchingForm: true,
    form: null,
    error: ''
});

function reducer(state = initialState, action) {
    switch (action.type) {
        case actions.FETCH_FORM:
            return state.set('isFetchingForm', true);
        case actions.FETCH_FORM_SUCCESS:
            const data = action.payload.entity;
            return state.set('isFetchingForm', false)
                .set('form', data[0]);
        case actions.FETCH_FORM_FAILURE:
            return state.set('isFetchingForm', false)
                .set('error', action.payload);
        default:
            return state;
    }
}

export default reducer;
