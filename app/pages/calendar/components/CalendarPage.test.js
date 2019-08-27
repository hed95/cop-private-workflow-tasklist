import React from 'react';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import CalendarPage from './CalendarPage';

describe('Calendar Page', () => {
  const mockStore = configureStore();
  let store;
  const initialState = {
    'calendar-page': {},
  };
  beforeEach(() => {
    store = mockStore(initialState);
  });
  it('renders calendar page', async () => {
    const props = {};
    await mount(<CalendarPage
      store={store}
      {...props}
    />, { attachTo: document.body });
    const toolBar = document.querySelector('.fc-toolbar');
    expect(toolBar).toBeDefined();

    const dayWeekMonth = document.querySelector('.fc-center');
    expect(dayWeekMonth).toBeDefined();

    const viewContainer = document.querySelector('.fc-view-container');
    expect(viewContainer).toBeDefined();
  });
});
