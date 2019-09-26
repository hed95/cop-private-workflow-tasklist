import React from 'react';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { ReportsDashboardPanel } from './ReportsDashboardPanel';

describe('Reports Dashboard Panel', () => {
  const mockStore = configureStore();
  let store;
  const initialState = {
    'calendar-page': {},
  };

  beforeEach(() => {
    store = mockStore(initialState);
  });

  it('renders reports dashboard panel', async () => {
    const props = {};
    const wrapper = await mount(<ReportsDashboardPanel
      store={store}
      {...props}
    />);
    expect(wrapper).toMatchSnapshot();
  });
});
