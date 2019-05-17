import React from 'react';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import Immutable from 'immutable';
import { TaskDetailsPage } from './TaskDetailsPage';
import moment from 'moment';
const { Map,List} = Immutable;

describe('TaskDetailsPage', () => {
  const mockStore = configureStore();
  let store;
  beforeEach(() => {
    store = mockStore({
      'task-page' : new Map({
        comments: new List([])
      })
    });
  });
  const updateDueDate = jest.fn();
  it('renders task if no form key', async() => {
    const dueDate = moment();
    const props = {
      candidateGroups: Immutable.fromJS([
        'teamA'
      ]),
      task: Immutable.fromJS({
        name:'test',
        formKey: null,
        description: 'test',
        due: dueDate,
        id: 'taskid',
        priority: 1000
      }),
      appConfig: {
        workflowServiceUrl: 'http://localhost:9000',
      },
    };
    const wrapper = await mount(<TaskDetailsPage
      store={store}
      {...props}
      updateDueDate={updateDueDate}
    />);
    console.log(wrapper.html());
    expect(wrapper.find('#taskName').text()).toEqual('test');
    expect(wrapper.find('#taskAssignee').text()).toEqual('AssigneeUnassigned');
    expect(wrapper.find('#taskPriority').text()).toEqual('PriorityHigh');
    expect(wrapper.find('#taskTeams').text()).toEqual('TeamteamA');
    expect(wrapper.find('#taskDescription').text()).toEqual('test');
    const dueDateInput = wrapper.find('#updateDueDate');
    expect(dueDateInput.props().defaultValue).toEqual(dueDate.format("DD-MM-YYYY HH:mm"));
  });
});
