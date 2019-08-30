import { Map } from 'immutable';
import * as actions from './actionTypes';

export const onboardingCheckState = new Map({
  isCheckingOnBoarding: null,
});


function onboardingCheckReducer(state = onboardingCheckState, action) {
  switch (action.type) {
    case actions.PERFORM_ONBOARDING_CHECK:
      return state.set('isCheckingOnBoarding', true);
    case actions.PERFORM_ONBOARDING_CHECK_COMPLETE:
      return state.set('isCheckingOnBoarding', false);
    default:
      return state;
  }
}


export default onboardingCheckReducer;
