import React from 'react';
import { mount, shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import Immutable from 'immutable';
import { FormsListPage } from './FormsListPage';

jest.mock('react-device-detect', () => ({
  isMobile: false,
}));

const { Map, List } = Immutable;

describe('ProceduresPage', () => {
  const initialState = {
    'procedures-list-page': new Map({
      isFetchingProcessDefinitions: true,
      processDefinitions: List([]),
    }),
  };
  const mockStore = configureStore();
  let store;

  beforeEach(() => {
    store = mockStore(initialState);
  });
  const fetchProcessDefinitions = jest.fn();

  it('renders loading when fetching data', () => {
    const props = {
      isFetchingProcessDefinitions: true,
      processDefinitions: List([]),
    };
    const wrapper = shallow(<FormsListPage
      store={store}
      {...props}
      fetchProcessDefinitions={fetchProcessDefinitions}
    />);

    console.log(wrapper.html());
    expect(fetchProcessDefinitions).toBeCalled();
    expect(wrapper.find('#proceduresCountLabel').text()).toEqual('0 forms');
    expect(wrapper.find('#loading').text()).toEqual('Loading forms...');
    expect(fetchProcessDefinitions).toBeCalled();
  });

  it('renders  a list of forms with form view', async () => {
    window.matchMedia = window.matchMedia || function matchMedia() {
      return {
        matches: true,
        addListener() {},
        removeListener() {},
      };
    };
    const props = {
      isFetchingProcessDefinitions: false,
      processDefinitions: Immutable.fromJS([{
        'process-definition': {
          key: 'processA',
          name: 'processA',
          description: 'processADescription',
        },
      }, {
        'process-definition': {
          key: 'processB',
          name: 'processB',
          description: 'processBDescription',
        },
      }]),
    };
    const wrapper = await mount(<FormsListPage
      store={store}
      {...props}
      fetchProcessDefinitions={fetchProcessDefinitions}
    />);

    expect(fetchProcessDefinitions).toBeCalled();
    expect(wrapper.find('#proceduresCountLabel').text()).toEqual('2 forms');

    const tableWrapper = wrapper.find('table');
    expect(tableWrapper.exists()).toEqual(true);

    const rows = wrapper.find('.widetable-process');
    expect(rows.length).toEqual(1);

    const firstRowColumns = rows.first().find('td').map(column => column.text());
    expect(firstRowColumns.length).toEqual(4);
    expect(firstRowColumns[0]).toEqual('processADescription');

    const map = rows.first().find('td').map(column => column);
    const actionButton = map[1];
    expect(actionButton.find('button').text()).toEqual('Start');

    window.matchMedia = null;
  });
});
