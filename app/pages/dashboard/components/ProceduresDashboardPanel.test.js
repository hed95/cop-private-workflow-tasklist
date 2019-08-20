import React from 'react';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { ProceduresDashboardPanel } from './ProceduresDashboardPanel';

describe('Procedures Dashboard Panel', () => {
  const mockStore = configureStore();
  let store;
  const initialState = {
    'procedures-page': {},
  };
  beforeEach(() => {
    store = mockStore(initialState);
  });
  it('renders procedures dashboard panel', async () => {
    const props = {};
    const wrapper = await mount(<ProceduresDashboardPanel
      store={store}
      {...props}
    />);
    expect(wrapper).toMatchSnapshot();
  });
  it('navigates to procedures page on click', async () => {
    const history = createMemoryHistory('/procedures');

    const props = {
      history,
      hasActiveShift: true,
    };
    const wrapper = await mount(<Router history={history}>
      <ProceduresDashboardPanel
        store={store}
        {...props}
      />
                                </Router>);

    const proceduresPageLink = wrapper.find('#proceduresPageLink');
    expect(proceduresPageLink.exists()).toEqual(true);

    proceduresPageLink.simulate('click');
    expect(props.history.location.pathname).toEqual('/procedures');
  });
});
