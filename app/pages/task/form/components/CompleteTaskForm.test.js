import React from 'react';
import { mount} from 'enzyme';
import configureStore from 'redux-mock-store';
import Immutable from 'immutable';
import {CompleteTaskForm} from './CompleteTaskForm';

const { Map } = Immutable;


const taskForm = {
  "type": "form",
  "tags": [
    "common"
  ],
  "owner": "XXXXX",
  "components": [
    {
      "autofocus": false,
      "id": "id",
      "input": true,
      "tableView": true,
      "inputType": "text",
      "inputMask": "",
      "label": "Text",
      "key": "text",
      "placeholder": "",
      "prefix": "",
      "suffix": "",
      "multiple": false,
      "defaultValue": "",
      "protected": false,
      "unique": false,
      "persistent": true,
      "hidden": false,
      "clearOnHide": true,
      "spellcheck": true,
      "validate": {
        "required": false,
        "minLength": "",
        "maxLength": "",
        "pattern": "",
        "custom": "",
        "customPrivate": false
      },
      "conditional": {
        "show": "",
        "when": null,
        "eq": ""
      },
      "type": "textfield",
      "labelPosition": "top",
      "tags": [],
      "properties": {}
    },
    {
      "id": "canceloperation",
      "autofocus": false,
      "input": true,
      "label": "Cancel operation",
      "tableView": false,
      "key": "canceloperation",
      "size": "md",
      "leftIcon": "",
      "rightIcon": "",
      "block": false,
      "action": "event",
      "disableOnInvalid": false,
      "theme": "primary",
      "type": "button",
      "tags": [],
      "conditional": {
        "show": "",
        "when": null,
        "eq": ""
      },
      "properties": {
        "success-message": "Operation successfully cancelled"
      },
      "event": "cancel-operation"
    }
  ],
  "_id": "XXXXX",
  "display": "form",
  "submissionAccess": [
    {
      "roles": [
        "5b0fa1b2769993003d6fba6f"
      ],
      "type": "create_own"
    },
    {
      "roles": [
        "XXXXX"
      ],
      "type": "read_own"
    },
    {
      "roles": [
        "XXXX"
      ],
      "type": "update_own"
    },
    {
      "roles": [
        "XXXXX"
      ],
      "type": "delete_own"
    }
  ],
  "title": "Custom Button Event",
  "name": "customButtonEvent",
  "path": "custombuttonevent",
  "access": [
    {
      "roles": [
        "XXXX",
        "XXXX",
        "XXXXX"
      ],
      "type": "read_all"
    }
  ],
  "created": "2019-02-01T07:13:35.002Z",
  "modified": "2019-02-01T07:13:35.069Z",
  "machineName": "customButtonEvent"
};
describe('CompleteTaskForm Component', () => {
  const initialState = {
    'task-form': new Map({
      loadingTaskForm: false,
      form: null,
      submittingToFormIO: false,
      submissionToFormIOSuccessful: false,
      submittingTaskFormForCompletion: false,
      taskFormCompleteSuccessful: null,
      customEventSuccessfullyExecuted: false,
      submittingCustomEvent: false
    })
  };
  const mockStore = configureStore();
  let store;
  beforeEach(() => {
    store = mockStore(initialState);
  });
  const fetchTaskForm = jest.fn();
  const resetForm = jest.fn();
  const submitTaskForm = jest.fn();
  const unclaimTask = jest.fn();
  const customEvent = jest.fn();

  it('renders loading text', async() => {
    const props = {
      formName: 'testForm',
      loadingTaskForm : true,
      task: Immutable.fromJS({
        assignee: null,
        name: 'testTask'
      })
    };
    const wrapper = await mount(
      <CompleteTaskForm store={store} {...props}
                        fetchTaskForm={fetchTaskForm}
                        resetForm={resetForm}
                        submitTaskForm={submitTaskForm}
                        unclaimTask={unclaimTask}
                        customEvent={customEvent}
      />
    );
    console.log(wrapper.debug());
    expect(fetchTaskForm).toBeCalled();
    expect(wrapper.name()).toEqual('CompleteTaskForm');
    expect(wrapper.html()).toEqual('<div id="dataSpinner"><div class="loader-content"><div color="black" style="color: black;" class="sk-fade-in sk-spinner line-spin-fade-loader"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div><div class="loader-message"><strong class="govuk-!-font-weight-bold">Loading form for task...</strong></div></div>');
    wrapper.unmount();
    expect(resetForm).toBeCalled();
  });

  it('renders task form', async() =>{
    const props = {
      formName: 'testForm',
      loadingTaskForm: false,
      form: taskForm,
      task: Immutable.fromJS({
        assignee: null,
        name: 'testTask'
      }),
      variables: {

      }
    };
    const wrapper = await shallow(
      <CompleteTaskForm store={store} {...props}
                        fetchTaskForm={fetchTaskForm}
                        resetForm={resetForm}
                        submitTaskForm={submitTaskForm}
                        unclaimTask={unclaimTask}
                        customEvent={customEvent}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

});
