import React from 'react';
import configureStore from 'redux-mock-store';
import { Map, List } from 'immutable';
import AppConstants from '../../common/AppConstants';
import NotFound, { NotFoundPage } from './NotFound';

describe('NotFound page', () => {
  const props = {
    errors: List([
      Map({
        status: 500,
        message: 'test',
      }),
    ]),
    resource: 'Form',
  };

  it('renders without crashing', () => {
    const wrapper = mount(<NotFoundPage {...props} />);
    expect(wrapper.exists()).toBe(true);
  });
  it('renders standard notice if not 404 error', () => {
    const wrapper = shallow(<NotFoundPage {...props} />);
    expect(wrapper.find('h4').text()).toBe(
      'Form with identifier  was not found',
    );
    expect(global.window.document.title).toBe(
      `Error | ${AppConstants.APP_NAME}`,
    );
  });

  it('renders 404 page if 404 error', () => {
    const wrapper = shallow(<NotFoundPage {...props} />);
    wrapper.setProps({
      ...props,
      errors: List([
        Map({
          status: 404,
          message: 'test',
        }),
      ]),
    });
    expect(wrapper.find('h2').text()).toBe('Page not found');
    expect(global.window.document.title).toBe(
      `Page not found | ${AppConstants.APP_NAME}`,
    );
  });

  it('matches snapshot', () => {
    const wrapper = shallow(<NotFoundPage {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});

describe('NotFound container', () => {
  it('receives state as expected', () => {
    const store = configureStore()({
      'error-page': Map({
        errors: List([
          Map({
            status: 404,
            message: 'test',
          }),
        ]),
      }),
    });
    const wrapper = shallow(<NotFound store={store} resource="Form" />);
    expect(wrapper.exists()).toBe(true);
  });
});
