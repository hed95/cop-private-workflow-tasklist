import staffReducer from './staff.reducer';
import shiftReducer from './shift.reducer';
import onboardingCheckReducer from './onboardChecker.reducer';

import { shiftInitialState } from './shift.reducer';
import { staffInitialState } from './staff.reducer';
import { onboardingCheckState } from './onboardChecker.reducer';
import Immutable from 'immutable';

const reducers = [onboardingCheckReducer, staffReducer, shiftReducer];
const initial = Immutable.Map({});

const initialState = initial.mergeWith(
  onboardingCheckState,
  shiftInitialState,
  staffInitialState,
);


function reducer(state = initialState, action) {
  return reducers.reduce((s, r) => r(s, action), state);
}


export default reducer;
