import React from 'react';
import Enzyme from 'enzyme';
import { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from 'redux-mock-store';
import CalendarPage from './CalendarPage';
Enzyme.configure({ adapter: new Adapter() });

describe('Calendar Page', () => {
  const mockStore = configureStore();
  let store;
  const initialState = {
    'calendar-page': {}
  };
  beforeEach(() => {
    store = mockStore(initialState);
  });
  it('renders calendar page', async() => {
    const props = {};
    const wrapper = await mount(<CalendarPage
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
