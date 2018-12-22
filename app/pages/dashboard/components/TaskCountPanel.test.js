import React from 'react';
import Enzyme from 'enzyme';
import { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from 'redux-mock-store';
import Immutable from 'immutable';
import { TaskCountPanel } from './TaskCountPanel';
import PubSub from 'pubsub-js';
const { Map} = Immutable;
Enzyme.configure({ adapter: new Adapter() });


jest.mock('pubsub-js', ()=>({
  subscribe:jest.fn(),
  unsubscribe: jest.fn(),
  publish: jest.fn()
}));


describe('TaskCountPanel', () => {

  const mockStore = configureStore();
  let store;

  beforeEach(() => {
    store = mockStore({});
  });
  const fetchTaskCounts = jest.fn();
  const setDefaultCounts = jest.fn();

  it('renders default value if no active shift', async () => {
    const props = {
      hasActiveShift: false,
      taskCounts: new Map({
        'tasksAssignedToUser' : 0,
        'tasksUnassigned' : 0,
        'totalTasksAllocatedToTeam': 0
      }),
    };
    const wrapper = await mount(<TaskCountPanel
      store={store}
      {...props}
      fetchTaskCounts={fetchTaskCounts}
      setDefaultCounts={setDefaultCounts}
    />);
    expect(setDefaultCounts).toBeCalled();
    expect(fetchTaskCounts).not.toBeCalled();

    const yourTasksPanel = wrapper.find('#yourTasksPanel');
    expect(yourTasksPanel.exists()).toEqual(true);
    expect(yourTasksPanel.find('.bold-xlarge').text()).toEqual('0');
    expect(yourTasksPanel.find('.bold-small').text()).toEqual('tasks assigned to you');


    const unassignedTasksPanel = wrapper.find('#unassignedTasksPanel');
    expect(unassignedTasksPanel.exists()).toEqual(true);
    expect(unassignedTasksPanel.find('.bold-xlarge').text()).toEqual('0');
    expect(unassignedTasksPanel.find('.bold-small').text()).toEqual('unassigned tasks');

    const youTeamTasks = wrapper.find('#youTeamTasks');
    expect(youTeamTasks.exists()).toEqual(true);
    expect(youTeamTasks.find('.bold-xlarge').text()).toEqual('0');
    expect(youTeamTasks.find('.bold-small').text()).toEqual('tasks allocated to your team');

  });
  it('renders values when shift active', async() => {
    const props = {
      hasActiveShift: true,
      taskCounts: new Map({
        'tasksAssignedToUser' : 10,
        'tasksUnassigned' : 1,
        'totalTasksAllocatedToTeam': 10
      }),
    };
    const wrapper = await mount(<TaskCountPanel
      store={store}
      {...props}
      fetchTaskCounts={fetchTaskCounts}
      setDefaultCounts={setDefaultCounts}
    />);
    expect(fetchTaskCounts).toBeCalled();
    expect(PubSub.subscribe).toBeCalled();


    const yourTasksPanel = wrapper.find('#yourTasksPanel');
    expect(yourTasksPanel.exists()).toEqual(true);
    expect(yourTasksPanel.find('.bold-xlarge').text()).toEqual('10');
    expect(yourTasksPanel.find('.bold-small').text()).toEqual('tasks assigned to you');


    const unassignedTasksPanel = wrapper.find('#unassignedTasksPanel');
    expect(unassignedTasksPanel.exists()).toEqual(true);
    expect(unassignedTasksPanel.find('.bold-xlarge').text()).toEqual('1');
    expect(unassignedTasksPanel.find('.bold-small').text()).toEqual('unassigned tasks');

    const youTeamTasks = wrapper.find('#youTeamTasks');
    expect(youTeamTasks.exists()).toEqual(true);
    expect(youTeamTasks.find('.bold-xlarge').text()).toEqual('10');
    expect(youTeamTasks.find('.bold-small').text()).toEqual('tasks allocated to your team');
  });
});
