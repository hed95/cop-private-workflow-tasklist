import React from 'react';
import Enzyme from 'enzyme';
import { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from 'redux-mock-store';
import Immutable from 'immutable';
import { YourGroupUnassignedTasksContainer } from './YourGroupUnassignedTasksContainer';
import moment from 'moment';
import AppConstants from '../../../common/AppConstants';
const { Map } = Immutable;
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
Enzyme.configure({ adapter: new Adapter() });

jest.useFakeTimers();

describe('UnassignedTasks Page', () => {
  const mockStore = configureStore();
  let store;
  const date = moment();
  const unassignedTasks = Immutable.fromJS({
    isFetchingUnassignedTasks: false,
    yourGroupsUnassignedTasksSortValue: 'sort=due,desc',
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
  const fetchUnassignedTasks = jest.fn();
  it('renders loading when getting unssigned tasks', async()=> {
    const props = {
      unassignedTasks: Immutable.fromJS({
        isFetchingUnassignedTasks: true
      })
    };
    const wrapper = await mount(<YourGroupUnassignedTasksContainer
      store={store}
      {...props}
      fetchUnassignedTasks={fetchUnassignedTasks}
    />);
    expect(wrapper.find('.loader-content').exists()).toEqual(true);
    expect(wrapper.find('.loader-message').text()).toEqual('Fetching your group unassigned tasks');
  });

  it('renders your tasks', async() => {

    const props = {
      unassignedTasks: unassignedTasks
    };
    const wrapper = await mount(<YourGroupUnassignedTasksContainer
      store={store}
      {...props}
      fetchUnassignedTasks={fetchUnassignedTasks}
    />);

    expect(fetchUnassignedTasks).toBeCalled();
    expect(wrapper.find('.loader-content').exists()).toEqual(false);
    expect(wrapper.find('#unassignedTasksTotalCount').text()).toEqual('1 unassigned task');
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

    const firstRowColumns = rows.first().find('td').map(column => column.text());
    expect(firstRowColumns.length).toEqual(4);
    expect(firstRowColumns[0]).toEqual('test');
    expect(firstRowColumns[1]).toEqual('High');
    expect(firstRowColumns[2]).toEqual('a few seconds ago');
    expect(firstRowColumns[3]).toEqual('a few seconds ago');

  });

  it('renders your tasks on sort change', async() => {
    const props = {
      unassignedTasks: unassignedTasks
    };
    const wrapper = await mount(<YourGroupUnassignedTasksContainer
      store={store}
      {...props}
      fetchUnassignedTasks={fetchUnassignedTasks}
    />);

    expect(fetchUnassignedTasks).toBeCalled();

    const sortTaskInput = wrapper.find('#sortTask');
    sortTaskInput.simulate('change', {target: { value : 'sort=created,desc'}});
    expect(fetchUnassignedTasks).toBeCalledWith('sort=created,desc', undefined, true);

    sortTaskInput.simulate('change', {target: { value : 'sort=test,desc'}});
    expect(fetchUnassignedTasks).toBeCalledWith('sort=test,desc', undefined, true);

  });

  it('renders your tasks on filter value', async() => {
    const props = {
      unassignedTasks: unassignedTasks
    };
    const wrapper = await mount(<YourGroupUnassignedTasksContainer
      store={store}
      {...props}
      fetchUnassignedTasks={fetchUnassignedTasks}
    />);


    expect(fetchUnassignedTasks).toBeCalled();
    const yourTaskFilterInput = wrapper.find('#filterTaskName');

    yourTaskFilterInput.simulate('change', {target: { value : 'ABC'}});
    jest.advanceTimersByTime(600);
    expect(fetchUnassignedTasks).toBeCalledWith('sort=due,desc', 'ABC', true);

    yourTaskFilterInput.simulate('change', {target: { value : 'APPLES'}});
    jest.advanceTimersByTime(600);
    expect(fetchUnassignedTasks).toBeCalledWith('sort=due,desc', 'APPLES', true);

  });

  it('executes timer', async() => {
    const props = {
      unassignedTasks: Immutable.fromJS({
        isFetchingUnassignedTasks: false,
        yourGroupsUnassignedTasksSortValue: 'sort=due,desc',
        yourGroupsUnassignedTasksFilterValue: 'TEST',
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

    const wrapper = await mount(<YourGroupUnassignedTasksContainer
      store={store}
      {...props}
      fetchUnassignedTasks={fetchUnassignedTasks}
    />);
    expect(fetchUnassignedTasks).toBeCalledWith('sort=due,desc', null, false);

    //kick off timer
    jest.advanceTimersByTime(AppConstants.THREE_MINUTES);
    expect(fetchUnassignedTasks).toBeCalledWith('sort=due,desc', 'TEST', true);

    //
    wrapper.unmount();
    expect(clearTimeout).toBeCalled();
  });
  it ('navigates to task', async() => {
    const history = createMemoryHistory("/task");

    const props = {
      history: history,
      unassignedTasks: Immutable.fromJS({
        isFetchingUnassignedTasks: false,
        yourGroupsUnassignedTasksSortValue: 'sort=due,desc',
        yourGroupsUnassignedTasksFilterValue: 'TEST',
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

    const wrapper = await mount(<Router history={history}><YourGroupUnassignedTasksContainer
      store={store}
      {...props}
      fetchUnassignedTasks={fetchUnassignedTasks}
    /></Router>);

    const idLink = wrapper.find('#link').first();
    expect(idLink.exists()).toEqual(true);

    idLink.simulate('click');
    expect(props.history.location.pathname).toEqual('/task');
    expect(props.history.location.search).toEqual('?taskId=id');
  });
});
