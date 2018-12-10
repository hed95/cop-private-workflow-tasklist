import { List, Map} from "immutable";
import configureStore from 'redux-mock-store';
import { mount } from 'enzyme';
import ErrorHandlingComponent from './ErrorHandlingComponent';
import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Immutable from 'immutable';
import { shallow } from 'enzyme';
import { Redirect } from 'react-router';


Enzyme.configure({ adapter: new Adapter() });

describe('Error Handling Component', () => {

  it ('renders no errors', async() => {
    const initialState = {'error-page' : new Map({
        hasError: false,
        errors: new List([]),
        unauthorised: false,
      })};
    const mockStore = configureStore();
    const store = mockStore(initialState);

    const wrapper = await mount(
      <ErrorHandlingComponent store={store}>
        <div>Hello</div>
      </ErrorHandlingComponent>
    );

    expect(wrapper.html()).toEqual('<div><div>Hello</div></div>');
  });
  it('renders errors', async() => {
    const initialState = {
      'error-page': new Map({
        hasError: true,
        errors: Immutable.fromJS([{
          url: '/api/test',
          status: 400,
          message: 'Failed'
        }]),
        unauthorised: false,
      })
    };
    const mockStore = configureStore();
    const store = mockStore(initialState);

    const wrapper = await mount(
      <ErrorHandlingComponent store={store}>
        <div>Hello</div>
      </ErrorHandlingComponent>
    );

    expect(wrapper.html()).toEqual('<div><div class="error-summary" role="alert" aria-labelledby="error-summary-heading-example-1" tabindex="-1"><h2 class="heading-medium error-summary-heading" id="error-summary-heading-example-1">We are experiencing technical problems</h2><ul class="error-summary-list"><li>/api/test - [400 ] - Failed</li></ul></div><div>Hello</div></div>');
  });
  it('redirect to dashboard if unauthorised', () => {
    const initialState = {'error-page' : new Map({
        hasError: false,
        errors: new List([]),
        unauthorised: true
      })
    };
    const mockStore = configureStore();
    const store = mockStore(initialState);

    const wrapper = shallow(
      <ErrorHandlingComponent store={store}>
        <div>Hello</div>
      </ErrorHandlingComponent>
    );
    expect(wrapper.containsMatchingElement(Redirect)).toEqual(true);
  });
});
