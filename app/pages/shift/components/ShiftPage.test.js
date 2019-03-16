import { mount } from 'enzyme/build';
import { ShiftPage } from './ShiftPage';
import React from 'react';
import itParam from 'mocha-param';

describe('Shift page', () => {
  const fetchActiveShift = jest.fn();
  const fetchShiftForm = jest.fn();
  const fetchStaffDetails = jest.fn();

  itParam('renders loading page for props = ${JSON.stringify(value)}', [{
    isFetchingShift: true
  }, {
    isFetchingStaffDetails: true
  }, {
    loadingShiftForm: true
  }], async (props) => {
    const wrapper = await mount(<ShiftPage
      {...props}
      fetchActiveShift={fetchActiveShift}
      fetchShiftForm={fetchShiftForm}
      fetchStaffDetails={fetchStaffDetails}
    />);

    expect(fetchStaffDetails).toHaveBeenCalled();
    expect(fetchShiftForm).toHaveBeenCalled();
    expect(fetchStaffDetails).toHaveBeenCalled();

    expect(wrapper.find('#dataSpinner').exists()).toEqual(true);
    expect(wrapper.find('.loader-message').text()).toEqual('Loading your shift details');
  });

  it ('renders error panel if submission fails', async() => {
    const props = {
      isFetchingShift: false,
      isFetchingStaffDetails: false,
      loadingShiftForm: false,
      failedToCreateShift: true,
      submittingActiveShift: false
    };
    const wrapper = await mount(<ShiftPage
      {...props}
      fetchActiveShift={fetchActiveShift}
      fetchShiftForm={fetchShiftForm}
      fetchStaffDetails={fetchStaffDetails}
    />);

    expect(fetchStaffDetails).toHaveBeenCalled();
    expect(fetchShiftForm).toHaveBeenCalled();
    expect(fetchStaffDetails).toHaveBeenCalled();

    expect(wrapper.find('.error-summary').exists()).toEqual(true);
    expect(wrapper.find('.error-summary-list').exists()).toEqual(true);
  });

  it ('renders submitting once submitted', async() => {
    const props = {
      isFetchingShift: false,
      isFetchingStaffDetails: false,
      loadingShiftForm: false,
      failedToCreateShift: false,
      submittingActiveShift: false
    };
    const wrapper = await mount(<ShiftPage
      {...props}
      fetchActiveShift={fetchActiveShift}
      fetchShiftForm={fetchShiftForm}
      fetchStaffDetails={fetchStaffDetails}
    />);

    wrapper.setProps({submittingActiveShift: true});
    const loaderContent = wrapper.find('.Loader__content');
    expect(loaderContent.exists()).toEqual(true);
    expect(loaderContent.prop('style')).toEqual({opacity: 0});
  });
});
