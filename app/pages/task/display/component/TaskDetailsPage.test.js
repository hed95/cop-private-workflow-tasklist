import React from 'react';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import Immutable from 'immutable';
import moment from 'moment';
import { TaskDetailsPage } from './TaskDetailsPage';

const { Map, List } = Immutable;

describe('TaskDetailsPage', () => {
  const mockStore = configureStore();
  const updateDueDate = jest.fn();
  const dueDate = moment();
  const props = {
    candidateGroups: Immutable.fromJS([
      'teamA',
    ]),
    task: Immutable.fromJS({
      name: 'test',
      formKey: null,
      description: 'test',
      due: dueDate,
      id: 'taskid',
      priority: 1000,
    }),
    appConfig: {
      workflowServiceUrl: 'http://localhost:9000',
    },
  };
  let store;

  beforeEach(() => {
    store = mockStore({
      'task-page': new Map({
        comments: new List([]),
      }),
    });
  });

  it('renders task if no form key', async () => {
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
  });

  it('renders the comment form if displayCommentForm is true', async () => {
    props.form = {
      components: [{
        key: 'displayCommentForm',
        defaultValue: 'true',
      }],
    };
    const wrapper = await mount(<TaskDetailsPage
      store={store}
      {...props}
      updateDueDate={updateDueDate}
    />);
    console.log(wrapper.html());
    expect(wrapper.exists('#updateDueDate')).toEqual(true);
  });

  it('does not render the comment form if displayCommentForm is false', async () => {
    props.form = {
      components: [{
        key: 'displayCommentForm',
        defaultValue: 'false',
      }],
    };
    const wrapper = await mount(<TaskDetailsPage
      store={store}
      {...props}
      updateDueDate={updateDueDate}
    />);
    console.log(wrapper.html());
    expect(wrapper.exists('#updateDueDate')).toEqual(false);
  });

  it('does not render the comment form if displayCommentForm is undefined', async () => {
    props.form = {
      components: [{}],
    };
    const wrapper = await mount(<TaskDetailsPage
      store={store}
      {...props}
      updateDueDate={updateDueDate}
    />);
    console.log(wrapper.html());
    expect(wrapper.exists('#updateDueDate')).toEqual(false);
  });
});
