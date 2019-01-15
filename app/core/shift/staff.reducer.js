import Immutable from 'immutable';
import * as actions from './actionTypes';

const {Map} = Immutable;

export const staffInitialState = new Map({
  staffDetails: null,
  isFetchingStaffDetails: true
});


function staffReducer(state = staffInitialState, action) {
  switch (action.type) {
    case actions.FETCH_STAFF_DETAILS:
      return state.set('isFetchingStaffDetails', true);
    case actions.FETCH_STAFF_DETAILS_SUCCESS:
      const staffResponse = action.payload.entity;
      const hasStaffDetails = staffResponse && staffResponse.length !== 0;
      const staff = hasStaffDetails ? Immutable.fromJS(staffResponse[0]) : null;
      return state.set('isFetchingStaffDetails', false)
        .set('staffDetails', staff);
    case actions.FETCH_STAFF_DETAILS_FAILURE:
      return state.set('isFetchingStaffDetails', false);
    default:
      return state;
  }
}


export default staffReducer;
