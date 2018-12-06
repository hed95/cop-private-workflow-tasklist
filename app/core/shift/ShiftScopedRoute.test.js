process.env.REACT_SPINKIT_NO_STYLES = 'true';

import React from 'react';
import Enzyme from 'enzyme';
import { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import configureStore from 'redux-mock-store';
import Immutable from 'immutable';
import ShiftScopedRoute from './ShiftScopedRoute';
import { DataSpinner } from '../components/DataSpinner';

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
});
