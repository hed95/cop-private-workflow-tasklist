import { Map } from 'immutable';
import * as actions from './actionTypes';
import secureLocalStorage from '../../common/security/SecureLocalStorage';

export const staffInitialState = new Map({
  staffDetails: null,
  isFetchingStaffDetails: true,
  isFetchingStaffId: true,
});

function staffReducer(state = staffInitialState, action) {
  let mergedStaffDetails;
  let staffDetails;
  switch (action.type) {
    case actions.FETCH_STAFF_DETAILS:
      return state.set('isFetchingStaffDetails', true);
    case actions.FETCH_STAFF_DETAILS_SUCCESS:
      staffDetails = action.payload;
      if (staffDetails) {
        secureLocalStorage.set(
          `staffContext::${staffDetails.get('email')}`,
          staffDetails.toJS(),
        );
      }
      return state
        .set('isFetchingStaffDetails', false)
        .set('staffDetails', staffDetails);
    case actions.FETCH_STAFF_DETAILS_FAILURE:
      return state.set('isFetchingStaffDetails', false);
    case actions.FETCH_STAFF_ID:
      return state.set('isFetchingStaffId', true);
    case actions.FETCH_STAFF_ID_SUCCESS:
      mergedStaffDetails = state.get('staffDetails').mergeDeep(Map({ staffid: action.payload }));
      secureLocalStorage.set(
        `staffContext::${state.get('staffDetails').get('email')}`,
        mergedStaffDetails.toJS(),
      );
      return state
        .set('isFetchingStaffId', false)
        .set(
          'staffDetails',
          mergedStaffDetails,
        );
    case actions.FETCH_STAFF_ID_FAILURE:
      return state.set('isFetchingStaffId', false);
    default:
      return state;
  }
}

export default staffReducer;
