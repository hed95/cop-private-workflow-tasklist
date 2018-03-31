import Immutable from 'immutable';
import * as actions from './actionTypes';

const {Map} = Immutable;

const initialState = new Map({
    loadingForm: true,
    form: null,
    error: '',
    formLoadingFailed: false
});

function reducer(state = initialState, action) {
    switch (action.type) {
        case actions.FETCH_FORM:
            return state.set('loadingForm', true)
                .set('formLoadingFailed', false);
        case actions.FETCH_FORM_SUCCESS:
            const data = action.payload.entity;
            return state.set('loadingForm', false)
                .set('form', data[0])
                .set('formLoadingFailed', false);
        case actions.FETCH_FORM_FAILURE:
            return state.set('loadingForm', false)
                .set('error', action.payload)
                .set('formLoadingFailed', true);
        default:
            return state;
    }
}

export default reducer;
