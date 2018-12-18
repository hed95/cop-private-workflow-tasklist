import React from 'react';
import Enzyme from 'enzyme';
import { mount, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from 'redux-mock-store';
import Immutable from 'immutable';
import { TaskDetailsPage } from './TaskDetailsPage';
import moment from 'moment';
const { Map,List} = Immutable;
Enzyme.configure({ adapter: new Adapter() });

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
      })
    };
    const wrapper = await mount(<TaskDetailsPage
      store={store}
      {...props}
      updateDueDate={updateDueDate}
    />, {attachTo: document.body});
    console.log(wrapper.html());
    expect(wrapper.find('#taskName').text()).toEqual('test');
    expect(wrapper.find('#taskAssignee').text()).toEqual('Unassigned');
    expect(wrapper.find('#taskPriority').text()).toEqual('Priority: High');
    expect(wrapper.find('#taskTeams').text()).toEqual('Team: teamA');
    expect(wrapper.find('#taskDescription').text()).toEqual('test');
    const dueDateInput = wrapper.find('#updateDueDate');
    expect(dueDateInput.props().defaultValue).toEqual(dueDate.format("DD-MM-YYYY HH:mm"));

    console.log(wrapper.html());


  });
});
