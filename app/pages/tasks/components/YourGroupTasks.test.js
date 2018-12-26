import React from 'react';
import Enzyme from 'enzyme';
import { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from 'redux-mock-store';
import Immutable from 'immutable';
import { YourGroupTasksContainer } from './YourGroupTasksContainer';
import moment from 'moment';
import AppConstants from '../../../common/AppConstants';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

const { Map } = Immutable;
jest.useFakeTimers();
Enzyme.configure({ adapter: new Adapter() });

describe('YourGroupTasksContainer Page', () => {

  const mockStore = configureStore();
  let store;
  const date = moment();
  const yourGroupTasks = Immutable.fromJS({
    isFetchingYourGroupTasks: false,
    yourGroupTasksSortValue: 'sort=due,desc',
    total: 1,
    tasks: [{
      task: {
        id: 'id',
        name: 'test',
        priority: 1000,
        due: date,
        created: date,
        assignee: 'test@test.com'
      }
    }]
  });
  beforeEach(() => {
    store = mockStore({
      'tasks-page': new Map({})
    });
    window.matchMedia = window.matchMedia || function () {
      return {
        matches: true,
        addListener: function () {
        },
        removeListener: function () {
        }
      };
    };
  });
  afterEach(() => {
    window.matchMedia = null;
  });
  const fetchYourGroupTasks = jest.fn();
  it('renders data spinner while loading tasks', async () => {
    const props = {
      yourGroupTasks: Immutable.fromJS({
        isFetchingYourGroupTasks: true
      })
    };
    const wrapper = await mount(<YourGroupTasksContainer
      store={store}
      {...props}
      fetchYourGroupTasks={fetchYourGroupTasks}
    />);
    expect(fetchYourGroupTasks).toBeCalled();
    expect(wrapper.find('.loader-content').exists()).toEqual(true);
    expect(wrapper.find('.loader-message').text()).toEqual('Fetching your group tasks');
  });
  it('renders your tasks', async() => {

    const props = {
      yourGroupTasks: yourGroupTasks
    };
    const wrapper = await mount(<YourGroupTasksContainer
      store={store}
      {...props}
      fetchYourGroupTasks={fetchYourGroupTasks}
    />);

    expect(fetchYourGroupTasks).toBeCalled();
    expect(wrapper.find('.loader-content').exists()).toEqual(false);
    expect(wrapper.find('#yourGroupTasksTotalCount').text()).toEqual('1 task allocated to your team');
    console.log(wrapper.html());
    const tableWrapper = wrapper.find('table');
    expect(tableWrapper.exists()).toEqual(true);

    const rows = wrapper.find('.widetable');
    expect(rows.length).toEqual(1);

    const headerColumns = rows.first().find('th').map(column => column.text());
    expect(headerColumns[0]).toEqual('Task name');
    expect(headerColumns[1]).toEqual('Priority');
    expect(headerColumns[2]).toEqual('Created');
    expect(headerColumns[3]).toEqual('Due');
    expect(headerColumns[4]).toEqual('Assignee');

    const firstRowColumns = rows.first().find('td').map(column => column.text());
    expect(firstRowColumns.length).toEqual(5);
    expect(firstRowColumns[0]).toEqual('test');
    expect(firstRowColumns[1]).toEqual('High');
    expect(firstRowColumns[2]).toEqual('a few seconds ago');
    expect(firstRowColumns[3]).toEqual('a few seconds ago');
    expect(firstRowColumns[4]).toEqual('test@test.com');

  });
  it('renders your group tasks on filter value', async() => {
    const props = {
      yourGroupTasks: yourGroupTasks
    };
    const wrapper = await mount(<YourGroupTasksContainer
      store={store}
      {...props}
      fetchYourGroupTasks={fetchYourGroupTasks}
    />);


    expect(fetchYourGroupTasks).toBeCalled();
    const filterInput = wrapper.find('#filterTaskName');

    filterInput.simulate('change', {target: { value : 'ABC'}});
    jest.advanceTimersByTime(600);
    expect(fetchYourGroupTasks).toBeCalledWith('sort=due,desc', 'ABC', true);

    filterInput.simulate('change', {target: { value : 'APPLES'}});
    jest.advanceTimersByTime(600);
    expect(fetchYourGroupTasks).toBeCalledWith('sort=due,desc', 'APPLES', true);

  });

  it('executes timer', async() => {
    const props = {
      yourGroupTasks: Immutable.fromJS({
        isFetchingTasksAssignedToYou: false,
        yourGroupTasksSortValue: 'sort=due,desc',
        yourGroupTasksFilterValue: 'TEST',
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

    const wrapper = await mount(<YourGroupTasksContainer
      store={store}
      {...props}
      fetchYourGroupTasks={fetchYourGroupTasks}
    />);

    expect(fetchYourGroupTasks).toBeCalledWith('sort=due,desc', null, false);

    //kick off timer
    jest.advanceTimersByTime(AppConstants.THREE_MINUTES);
    expect(fetchYourGroupTasks).toBeCalledWith('sort=due,desc', 'TEST', true);

    //
    wrapper.unmount();
    expect(clearTimeout).toBeCalled();
  });
  it ('navigates to task', async() => {
    const history = createMemoryHistory("/task");

    const props = {
      history: history,
      yourGroupTasks: Immutable.fromJS({
        isFetchingTasksAssignedToYou: false,
        yourGroupTasksSortValue: 'sort=due,desc',
        yourGroupTasksFilterValue: 'TEST',
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

    const wrapper = await mount(<Router history={history}><YourGroupTasksContainer
      store={store}
      {...props}
      fetchYourGroupTasks={fetchYourGroupTasks}
    /></Router>);

    const idLink = wrapper.find('#link').first();
    expect(idLink.exists()).toEqual(true);

    idLink.simulate('click');
    expect(props.history.location.pathname).toEqual('/task');
    expect(props.history.location.search).toEqual('?taskId=id');
  });
});
