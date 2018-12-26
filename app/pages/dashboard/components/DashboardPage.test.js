import React from 'react';
import { mount, shallow} from 'enzyme';
import configureStore from 'redux-mock-store';
import {DashboardPage} from './DashboardPage';


describe('DashboardPage', () => {
  const mockStore = configureStore();
  let store;
  const initialState = {
    'calendar-page': {}
  };
  beforeEach(() => {
    store = mockStore(initialState);
  });
  const resetErrors = jest.fn();
  const fetchActiveShift = jest.fn();

  it('renders data spinner checking for shift', async() => {
    const props = {
      isFetchingShift: true
    };

    const wrapper = await mount(<DashboardPage
      store={store}
      {...props}
      fetchActiveShift={fetchActiveShift}
      resetErrors ={resetErrors}
    />);

    expect(resetErrors).toBeCalled();
    expect(fetchActiveShift).toBeCalled();

    expect(wrapper.find('#dataSpinner').exists()).toEqual(true);
    expect(wrapper.find('#dashboardContent').exists()).toEqual(false);
  });
  it('renders panels if shift present', async() => {
    const props = {
      isFetchingShift: false,
      hasActiveShift: true
    };

    const wrapper = shallow(<DashboardPage
      store={store}
      {...props}
      fetchActiveShift={fetchActiveShift}
      resetErrors ={resetErrors}
    />);

    expect(resetErrors).toBeCalled();
    expect(fetchActiveShift).toBeCalled();

    expect(wrapper.find('#dataSpinner').exists()).toEqual(false);
    expect(wrapper.find('ErrorPanel')).toBeDefined();
    expect(wrapper.find('DashboardTitle')).toBeDefined();
    expect(wrapper.find('DashboardPanel')).toBeDefined();
  });
  it('renders panels and warning if shift not present', async() => {
    const props = {
      isFetchingShift: false,
      hasActiveShift: false
    };

    const wrapper = shallow(<DashboardPage
      store={store}
      {...props}
      fetchActiveShift={fetchActiveShift}
      resetErrors ={resetErrors}
    />);

    expect(resetErrors).toBeCalled();
    expect(fetchActiveShift).toBeCalled();

    expect(wrapper.find('#dataSpinner').exists()).toEqual(false);
    expect(wrapper.find('ErrorPanel')).toBeDefined();
    expect(wrapper.find('DashboardTitle')).toBeDefined();
    expect(wrapper.find('DashboardPanel')).toBeDefined();

    expect(wrapper.find('.notice').exists()).toEqual(true);
    expect(wrapper.find('.notice').text()).toEqual('WarningPlease start your shift before proceeding')
  });
});
