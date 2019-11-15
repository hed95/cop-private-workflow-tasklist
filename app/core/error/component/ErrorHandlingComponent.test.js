import Immutable, { List, Map } from 'immutable';
import configureStore from 'redux-mock-store';
import { mount, shallow } from 'enzyme';
import React from 'react';


import { Redirect } from 'react-router';
import { ErrorHandlingComponent } from './ErrorHandlingComponent';


describe('Error Handling Component', () => {
  it('renders no errors', async () => {
    const initialState = {
      'error-page': new Map({
        hasError: false,
        errors: new List([]),
        unauthorised: false,
      }),
    };
    const mockStore = configureStore();
    const store = mockStore(initialState);

    const wrapper = await mount(
      <ErrorHandlingComponent store={store}>
        <div>Hello</div>
      </ErrorHandlingComponent>,
    );

    expect(wrapper.html()).toEqual('<div>Hello</div>');
  });
  it('renders errors', async () => {
    const initialState = {
      'error-page': new Map({
        hasError: true,
        errors: Immutable.fromJS([{
          url: '/api/test',
          status: 400,
          message: 'Failed',
        }]),
        unauthorised: false,
      }),
    };
    const mockStore = configureStore();
    const store = mockStore(initialState);

    const wrapper = await mount(
      <ErrorHandlingComponent
        store={store}
        hasError
        errors={Immutable.fromJS([{
          url: '/api/test',
          status: 400,
        }])}
      >
        <div>Hello</div>
      </ErrorHandlingComponent>,
    );
    expect(wrapper.html()).toEqual('<div class=\"govuk-error-summary\" role=\"alert\" aria-labelledby=\"error-summary-title\" tabindex=\"-1\"><h2 class=\"govuk-error-summary__title\" id=\"error-summary-title\">We are experiencing technical problems</h2><h4 class=\"govuk-heading-s\">The technical issue has been logged for support to investigate.</h4><details class=\"govuk-details\"><summary class=\"govuk-details__summary\"><span class=\"govuk-details__summary-text\">Error details</span></summary><div class=\"govuk-details__text\"><div class=\"govuk-error-summary__body\"><ul class=\"govuk-list govuk-list--bullet govuk-error-summary__list\"><li>/api/test - [400 ] - </li></ul></div></div></details></div><div>Hello</div>');
  });
  it('redirect to dashboard if unauthorised', () => {
    const initialState = {
      'error-page': new Map({
        hasError: false,
        errors: new List([]),
        unauthorised: true,
      }),
    };
    const mockStore = configureStore();
    const store = mockStore(initialState);

    const wrapper = shallow(
      <ErrorHandlingComponent store={store}>
        <div>Hello</div>
      </ErrorHandlingComponent>,
    );
    expect(wrapper.containsMatchingElement(Redirect)).toEqual(true);
  });
});
