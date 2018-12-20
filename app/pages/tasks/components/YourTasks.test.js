import React from 'react';
import Enzyme from 'enzyme';
import { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from 'redux-mock-store';
import Immutable from 'immutable';
import { YourTasks } from './YourTasks';
import moment from 'moment';
import AppConstants from '../../../common/AppConstants';
const { Map } = Immutable;
Enzyme.configure({ adapter: new Adapter() });

jest.useFakeTimers();

describe('YourTasks Page', () => {
  const mockStore = configureStore();
  let store;
  const date = moment();
  const yourTasks = Immutable.fromJS({
    isFetchingTasksAssignedToYou: false,
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
    const wrapper = await mount(<YourTasks
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
    const wrapper = await mount(<YourTasks
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

    wrapper.unmount();
    expect(sessionStorage.length).toEqual(0);
  });

  it('renders your tasks on sort change and stores in session storage', async() => {
    const props = {
      yourTasks: yourTasks
    };
    const wrapper = await mount(<YourTasks
      store={store}
      {...props}
      fetchTasksAssignedToYou={fetchTasksAssignedToYou}
    />);

    expect(fetchTasksAssignedToYou).toBeCalled();
    const sortTaskInput = wrapper.find('#sortTask');
    sortTaskInput.simulate('change', {target: { value : 'sort=created,desc'}});
    expect(sessionStorage.length).toEqual(1);
    expect(atob(sessionStorage.getItem('yourTasksSortValue'))).toEqual('sort=created,desc');
    expect(fetchTasksAssignedToYou).toBeCalled();


    sortTaskInput.simulate('change', {target: { value : 'sort=test,desc'}});
    expect(sessionStorage.length).toEqual(1);
    expect(atob(sessionStorage.getItem('yourTasksSortValue'))).toEqual('sort=test,desc');

    wrapper.unmount();
    expect(sessionStorage.length).toEqual(0);
  });

  it('renders your tasks on filter value and stores in session storage', async() => {
    const props = {
      yourTasks: yourTasks
    };
    const wrapper = await mount(<YourTasks
      store={store}
      {...props}
      fetchTasksAssignedToYou={fetchTasksAssignedToYou}
    />);

    expect(fetchTasksAssignedToYou).toBeCalled();
    const yourTaskFilterInput = wrapper.find('#filterTaskName');
    yourTaskFilterInput.simulate('change', {target: { value : 'ABC'}});
    expect(sessionStorage.length).toEqual(1);
    expect(atob(sessionStorage.getItem('yourTasksFilterValue'))).toEqual('ABC');

    yourTaskFilterInput.simulate('change', {target: { value : 'APPLES'}});
    expect(sessionStorage.length).toEqual(1);
    expect(atob(sessionStorage.getItem('yourTasksFilterValue'))).toEqual('APPLES');

    wrapper.unmount();
    expect(sessionStorage.length).toEqual(0);
  });

  it('executes timer', async() => {
    const props = {
      yourTasks: yourTasks
    };
    const wrapper = await mount(<YourTasks
      store={store}
      {...props}
      fetchTasksAssignedToYou={fetchTasksAssignedToYou}
    />);
    expect(fetchTasksAssignedToYou).toBeCalled();
    jest.advanceTimersByTime(AppConstants.THREE_MINUTES);
    expect(fetchTasksAssignedToYou).toBeCalled();

    wrapper.unmount();
    expect(clearTimeout).toBeCalled();
  });
  it('sortFilter present even after page refresh', async() => {
    const props = {
      yourTasks: yourTasks
    };
    const wrapper = await mount(<YourTasks
      store={store}
      {...props}
      fetchTasksAssignedToYou={fetchTasksAssignedToYou}
    />);

    const sortTaskInput = wrapper.find('#sortTask');

    sortTaskInput.simulate('change', {target: { value : 'sort=created,desc'}});
    expect(sessionStorage.length).toEqual(1);

    wrapper.update();
    expect(sessionStorage.length).toEqual(1);

    wrapper.unmount();
    expect(sessionStorage.length).toEqual(0);
  });

});
