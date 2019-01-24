import React from 'react';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import Immutable from 'immutable';
import { YourTasksContainer } from './YourTasksContainer';
import moment from 'moment';
import AppConstants from '../../../common/AppConstants';
const { Map } = Immutable;
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

jest.useFakeTimers();

describe('YourTasks Page', () => {
  const mockStore = configureStore();
  let store;
  const date = moment();
  const yourTasks = Immutable.fromJS({
    isFetchingTasksAssignedToYou: false,
    yourTasksSortValue: 'sort=due,desc',
    total: 1,
    tasks: [{
      task: {
        id: 'id',
        name: 'test',
        priority: 1000,
        due: date,
        created: date,
      }

    }]
  });
  beforeEach(() => {
    store = mockStore({
      'tasks-page' : new Map({})
    });
    window.matchMedia = window.matchMedia || function() {
      return {
        matches : true,
        addListener : function() {},
        removeListener: function() {}
      };
    };
  });
  afterEach(() => {
    window.matchMedia = null;
  });
  const fetchTasksAssignedToYou = jest.fn();
  it('renders loading when getting your tasks', async()=> {
    const props = {
     yourTasks: Immutable.fromJS({
       isFetchingTasksAssignedToYou: true
     })
    };
    const wrapper = await mount(<YourTasksContainer
      store={store}
      {...props}
      fetchTasksAssignedToYou={fetchTasksAssignedToYou}
    />);
    expect(wrapper.find('.loader-content').exists()).toEqual(true);
    expect(wrapper.find('.loader-message').text()).toEqual('Fetching tasks assigned to you');
  });

  it('renders your tasks', async() => {

    const props = {
      yourTasks: yourTasks
    };
    const wrapper = await mount(<YourTasksContainer
      store={store}
      {...props}
      fetchTasksAssignedToYou={fetchTasksAssignedToYou}
    />);

    expect(fetchTasksAssignedToYou).toBeCalled();
    expect(wrapper.find('.loader-content').exists()).toEqual(false);
    expect(wrapper.find('#yourTasksTotalCount').text()).toEqual('1 task assigned to you');
    console.log(wrapper.html());
    const tableWrapper = wrapper.find('table');
    expect(tableWrapper.exists()).toEqual(true);

    const rows = wrapper.find('.widetable');
    expect(rows.length).toEqual(1);

    const headerColumns = rows.first().find('th').map(column => column.text());
    expect(headerColumns[0]).toEqual('Task name');
    expect(headerColumns[1]).toEqual('Priority');
    expect(headerColumns[2]).toEqual('Due');
    expect(headerColumns[3]).toEqual('Created');

    const firstRowColumns = rows.first().find('td').map(column => column.text());
    expect(firstRowColumns.length).toEqual(4);
    expect(firstRowColumns[0]).toEqual('test');
    expect(firstRowColumns[1]).toEqual('High');
    expect(firstRowColumns[2]).toEqual('a few seconds ago');
    expect(firstRowColumns[3]).toEqual('a few seconds ago');

  });

  it('renders your tasks on sort change', async() => {
    const props = {
      yourTasks: yourTasks
    };
    const wrapper = await mount(<YourTasksContainer
      store={store}
      {...props}
      fetchTasksAssignedToYou={fetchTasksAssignedToYou}
    />);

    expect(fetchTasksAssignedToYou).toBeCalled();

    const sortTaskInput = wrapper.find('#sortTask');
    sortTaskInput.simulate('change', {target: { value : 'sort=created,desc'}});
    expect(fetchTasksAssignedToYou).toBeCalledWith('sort=created,desc', undefined, true);

    sortTaskInput.simulate('change', {target: { value : 'sort=test,desc'}});
    expect(fetchTasksAssignedToYou).toBeCalledWith('sort=test,desc', undefined, true);

  });

  it('renders your tasks on filter value', async() => {
    const props = {
      yourTasks: yourTasks
    };
    const wrapper = await mount(<YourTasksContainer
      store={store}
      {...props}
      fetchTasksAssignedToYou={fetchTasksAssignedToYou}
    />);


    expect(fetchTasksAssignedToYou).toBeCalled();
    const yourTaskFilterInput = wrapper.find('#filterTaskName');

    yourTaskFilterInput.simulate('change', {target: { value : 'ABC'}});
    jest.advanceTimersByTime(600);
    expect(fetchTasksAssignedToYou).toBeCalledWith('sort=due,desc', 'ABC', true);

    yourTaskFilterInput.simulate('change', {target: { value : 'APPLES'}});
    jest.advanceTimersByTime(600);
    expect(fetchTasksAssignedToYou).toBeCalledWith('sort=due,desc', 'APPLES', true);

  });

  it('executes timer', async() => {
    const props = {
      yourTasks: Immutable.fromJS({
        isFetchingTasksAssignedToYou: false,
        yourTasksSortValue: 'sort=due,desc',
        yourTasksFilterValue: 'TEST',
        total: 1,
        tasks: [{
          task: {
            id: 'id',
            name: 'test',
            priority: 1000,
            due: date,
            created: date,
          }

        }]
      })
    };

    const wrapper = await mount(<YourTasksContainer
      store={store}
      {...props}
      fetchTasksAssignedToYou={fetchTasksAssignedToYou}
    />);
    expect(fetchTasksAssignedToYou).toBeCalledWith('sort=due,desc', null, false);

    //kick off timer
    jest.advanceTimersByTime(AppConstants.ONE_MINUTE);
    expect(fetchTasksAssignedToYou).toBeCalledWith('sort=due,desc', 'TEST', true);

    //
    wrapper.unmount();
    expect(clearTimeout).toBeCalled();
  });
  it ('navigates to task', async() => {
    const history = createMemoryHistory("/task");

    const props = {
      history: history,
      yourTasks: Immutable.fromJS({
        isFetchingTasksAssignedToYou: false,
        yourTasksSortValue: 'sort=due,desc',
        yourTasksFilterValue: 'TEST',
        total: 1,
        tasks: [{
          task: {
            id: 'id',
            name: 'test',
            priority: 1000,
            due: date,
            created: date,
          }

        }]
      })
    };

    const wrapper = await mount(<Router history={history}><YourTasksContainer
      store={store}
      {...props}
      fetchTasksAssignedToYou={fetchTasksAssignedToYou}
    /></Router>);

    const idLink = wrapper.find('#link').first();
    expect(idLink.exists()).toEqual(true);

    idLink.simulate('click');
    expect(props.history.location.pathname).toEqual('/task');
    expect(props.history.location.search).toEqual('?taskId=id');
  });
});
