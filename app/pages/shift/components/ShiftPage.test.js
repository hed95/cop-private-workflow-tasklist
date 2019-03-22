import { mount } from 'enzyme/build';
import { ShiftPage } from './ShiftPage';
import React from 'react';
import itParam from 'mocha-param';
import {ErrorHandlingComponent} from '../../../core/error/component/ErrorHandlingComponent';
import Immutable from 'immutable';

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
    const wrapper = await mount(<ErrorHandlingComponent skipAuth={true} hasError={true} errors={
      Immutable.fromJS([{
        message: "failed"
      }])
    }><ShiftPage
      {...props}
      fetchActiveShift={fetchActiveShift}
      fetchShiftForm={fetchShiftForm}
      fetchStaffDetails={fetchStaffDetails}
    /></ErrorHandlingComponent>);

    expect(fetchStaffDetails).toHaveBeenCalled();
    expect(fetchShiftForm).toHaveBeenCalled();
    expect(fetchStaffDetails).toHaveBeenCalled();

    console.log(wrapper.html());

    expect(wrapper.find('.error-summary').exists()).toEqual(true);
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

  it('redirects to dashboard after shift created', async() => {
    const form = {
      'display': 'form',
      'components': [
        {
          'id': 'shiftminutes',
          'label': 'Shift minutes',
          'allowMultipleMasks': false,
          'showWordCount': false,
          'showCharCount': false,
          'tableView': true,
          'alwaysEnabled': false,
          'type': 'textfield',
          'input': true,
          'key': 'firstName',
          'widget': {
            'type': ''
          }
        },
        {
          'id': 'shifthours',
          'label': 'Shift hours',
          'allowMultipleMasks': false,
          'showWordCount': false,
          'showCharCount': false,
          'tableView': true,
          'alwaysEnabled': false,
          'type': 'textfield',
          'input': true,
          'key': 'firstName',
          'widget': {
            'type': ''
          }
        },
        {
          'id': 'submitId',
          'type': 'button',
          'label': 'Submit',
          'key': 'submit',
          'disableOnInvalid': true,
          'theme': 'primary',
          'input': true,
          'tableView': true
        }
      ],
    };
    const props = {
      isFetchingShift: false,
      isFetchingStaffDetails: false,
      loadingShiftForm: false,
      failedToCreateShift: false,
      submittingActiveShift: true,
      activeShiftSuccess: null,
      history: {
        replace: jest.fn()
      },
      shiftForm : form,
    };

    const wrapper = await mount(<ShiftPage
      {...props}
      fetchActiveShift={fetchActiveShift}
      fetchShiftForm={fetchShiftForm}
      fetchStaffDetails={fetchStaffDetails}
    />);

    const emit = jest.fn(args => console.log("Event " + args));

    const submission = {
      data: {
        "shiftminutes" : 10,
        "shifthours" : 10
      }
    };
    wrapper.instance().form.formio = {
      emit: emit,
      submission: submission
    };
    wrapper.setProps({activeShiftSuccess: true, submittingActiveShift: false});
    expect(emit).toHaveBeenCalled();
    expect(props.history.replace).toHaveBeenCalled();

  });
});
