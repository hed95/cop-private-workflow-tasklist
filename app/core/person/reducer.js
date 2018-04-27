import Immutable from 'immutable';
import * as actions from './actionTypes';

const {Map} = Immutable;

const initialState = new Map({
    isFetchingPerson: true,
    person: null,
});

function reducer(state = initialState, action) {
    switch (action.type) {
        case actions.FETCH_PERSON:
            return state.set('isFetchingPerson', true);
        case actions.FETCH_PERSON_SUCCESS:
           const data = action.payload.entity.length === 0 ? null : action.payload.entity[0];
           return state.set('isFetchingPerson', false)
               .set('person', Immutable.fromJS(data));
        case actions.FETCH_PERSON_FAILURE:
            return state.set('isFetchingPerson', false);
        default:
            return state;
    }
}

export default reducer;
