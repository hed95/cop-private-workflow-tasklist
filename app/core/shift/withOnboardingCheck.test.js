import configureStore from 'redux-mock-store';
import { shallow } from 'enzyme';
import DataSpinner from '../components/DataSpinner';
import React from 'react';
import WithOnboardingCheck from './withOnboardingCheck';
import Immutable from 'immutable';
import { Router } from 'react-router';
import SubmissionBanner from '../components/SubmissionBanner';
import { createMemoryHistory } from 'history';

const { Map } = Immutable;

describe("withOnboardingCheck", () => {
  it('Displays data spinner while performing onboarding check', () => {
    const initialState = {
      'shift-page': new Map({
        isCheckingOnBoarding: true
      })
    };
    const mockStore = configureStore();
    const store = mockStore(initialState);

    const wrapper = shallow(
      <WithOnboardingCheck store={store}>
        <div>Hello</div>
      </WithOnboardingCheck>
    );
    expect(wrapper.containsMatchingElement(DataSpinner)).toEqual(true);
  });

});
