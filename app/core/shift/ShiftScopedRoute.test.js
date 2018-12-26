import { Redirect, Route } from 'react-router';

import React from 'react';
import Enzyme from 'enzyme';
import { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from 'redux-mock-store';
import Immutable from 'immutable';
import ShiftScopedRoute from './ShiftScopedRoute';
import DataSpinner from '../components/DataSpinner';
import ErrorHandlingComponent from '../error/component/ErrorHandlingComponent';

const { Map } = Immutable;
Enzyme.configure({ adapter: new Adapter() });


describe('Shift Scoped Route', () => {
  it('Displays data spinner while checking shift', () => {
    const initialState = {
      'shift-page': new Map({
        isFetchingShift: true
      })
    };
    const mockStore = configureStore();
    const store = mockStore(initialState);

    const wrapper = shallow(
      <ShiftScopedRoute store={store}>
        <div>Hello</div>
      </ShiftScopedRoute>
    );
    expect(wrapper.containsMatchingElement(DataSpinner)).toEqual(true);

  });
  it('Redirects to dashboard if no shift', () => {
    const initialState = {
      'shift-page': new Map({
        isFetchingShift: false,
        hasActiveShift: false
      })
    };
    const mockStore = configureStore();
    const store = mockStore(initialState);

    const wrapper = shallow(
      <ShiftScopedRoute store={store}>
        <div>Hello</div>
      </ShiftScopedRoute>
    );
    expect(wrapper.containsMatchingElement(Redirect)).toEqual(true);
  });
  it('Renders component if authorised and has shift', () => {
    const initialState = {
      'shift-page': new Map({
        isFetchingShift: false,
        hasActiveShift: true
      })
    };
    const mockStore = configureStore();
    const store = mockStore(initialState);

    const wrapper = shallow(
      <ShiftScopedRoute store={store}>
        <div>Hello</div>
      </ShiftScopedRoute>
    );
    expect(wrapper.containsMatchingElement(Route)).toEqual(true);
    expect(wrapper.containsMatchingElement(ErrorHandlingComponent)).toEqual(true);

  });
});
