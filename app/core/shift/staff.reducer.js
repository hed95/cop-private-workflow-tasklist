import Immutable from 'immutable';
import * as actions from './actionTypes';
import secureLocalStorage from '../../common/security/SecureLocalStorage';

const { Map } = Immutable;

export const staffInitialState = new Map({
  staffDetails: null,
  isFetchingStaffDetails: true,
});

function staffReducer(state = staffInitialState, action) {
  let hasStaffDetails;
  let staff;
  let staffResponse;
  switch (action.type) {
    case actions.FETCH_STAFF_DETAILS:
      return state.set('isFetchingStaffDetails', true);
    case actions.FETCH_STAFF_DETAILS_SUCCESS:
      ({ entity: staffResponse } = action.payload);
      hasStaffDetails = staffResponse && staffResponse.length !== 0;
      staff = hasStaffDetails ? Immutable.fromJS(staffResponse[0]) : null;
      if (staff) {
        secureLocalStorage.set(
          `staffContext::${staff.get('email')}`,
          staff.toJS(),
        );
      }
      return state
        .set('isFetchingStaffDetails', false)
        .set('staffDetails', staff);
    case actions.FETCH_STAFF_DETAILS_FAILURE:
      return state.set('isFetchingStaffDetails', false);
    default:
      return state;
  }
}

export default staffReducer;
