import Immutable from 'immutable';
import * as actions from './actionTypes';

const {Map, List} = Immutable;

const initialState = new Map({
    loadingTaskForm: true,
    form: null,
});

function reducer(state = initialState, action) {
    switch (action.type) {
        case actions.FETCH_TASK_FORM:
            return state.set('loadingTaskForm', true)
                .set('form', null);
        case actions.FETCH_TASK_FORM_SUCCESS:
            const data = action.payload.entity;
            return state.set('loadingTaskForm', false)
                .set('form', data);
        case actions.FETCH_TASK_FROM_FAILURE:
            return state.set('loadingTaskForm', false);
        default:
            return state;
    }
}

export default reducer;
