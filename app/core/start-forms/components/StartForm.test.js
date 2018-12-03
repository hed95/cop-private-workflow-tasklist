import React from 'react';
import Enzyme from 'enzyme';
import { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import configureStore from 'redux-mock-store';
import Immutable from 'immutable';
import { StartForm } from './StartForm';

const { Map } = Immutable;


Enzyme.configure({ adapter: new Adapter() });

describe('StartForm Component', () => {
  const initialState = {
    form: new Map({
      loadingForm: false,
      form: null,
      submittingToFormIO: false,
      submissionToFormIOSuccessful: false,
      submittingToWorkflow: false,
      submissionToWorkflowSuccessful: null
    })
  };
  const mockStore = configureStore();
  let store;
  beforeEach(() => {
    store = mockStore(initialState);
  });
  it('renders loading text', async() => {
    const props = {
      formName: 'testForm',
      loadingForm : true
    };
    const fetchForm = jest.fn();
    const resetForm = jest.fn();
    const fetchFormWithContext = jest.fn();
    const wrapper = await mount(
      <StartForm store={store} {...props}
                 fetchForm={fetchForm}
                 resetForm={resetForm}
                 fetchFormWithContext={fetchFormWithContext}
      />
    );
    console.log(wrapper.debug());
    expect(fetchForm).toBeCalled();
    expect(wrapper.name()).toEqual('StartForm');
    expect(wrapper.html()).toEqual('<div><!-- react-text: 2 -->Loading form for <!-- /react-text --><!-- react-text: 3 --> <!-- /react-text --></div>');
    wrapper.unmount();
    expect(resetForm).toBeCalled();
  });
  it('renders start form',  async () => {
    const props = {
      formName: 'testForm',
      loadingForm: false,
      processKey: 'processKey',
      form : {
        "display": "form",
        "components": [
          {
            "id": 'firstNameId',
            "label": "First name",
            "allowMultipleMasks": false,
            "showWordCount": false,
            "showCharCount": false,
            "tableView": true,
            "alwaysEnabled": false,
            "type": "textfield",
            "input": true,
            "key": "firstName",
            "widget": {
              "type": ""
            }
          },
          {
            "id" : "surnameId",
            "label": "Surname",
            "allowMultipleMasks": false,
            "showWordCount": false,
            "showCharCount": false,
            "tableView": true,
            "alwaysEnabled": false,
            "type": "textfield",
            "input": true,
            "key": "surname",
            "widget": {
              "type": ""
            }
          },
          {
            "id" : "submitId",
            "type": "button",
            "label": "Submit",
            "key": "submit",
            "disableOnInvalid": true,
            "theme": "primary",
            "input": true,
            "tableView": true
          }
        ],
      }
    };

    const fetchForm = jest.fn();
    const resetForm = jest.fn();
    const fetchFormWithContext = jest.fn();
    const wrapper = await mount(
      <StartForm store={store} {...props}
                 fetchForm={fetchForm}
                 resetForm={resetForm}
                 fetchFormWithContext={fetchFormWithContext}
      />
    );
    expect(fetchForm).toBeCalled();
    expect(wrapper.name()).toEqual('StartForm');
    expect(wrapper.html()).toEqual('<div class="null null formio-form"><div class="loader-wrapper"><div class="loader text-center"></div></div><div hidden="true" style="visibility: hidden; position: absolute;"><div id="firstNameId" class="form-group has-feedback formio-component formio-component-textfield formio-component-firstName " style=""><label class="control-label" style="">First name</label><input name="data[firstName]" type="text" class="form-control" lang="en"></div><div id="surnameId" class="form-group has-feedback formio-component formio-component-textfield formio-component-surname " style=""><label class="control-label" style="">Surname</label><input name="data[surname]" type="text" class="form-control" lang="en"></div><div id="submitId" class="form-group has-feedback formio-component formio-component-button formio-component-submit  form-group" style=""><button name="data[submit]" type="submit" class="btn btn-primary btn-md" lang="en">Submit</button></div></div></div>')
    wrapper.unmount();
    expect(resetForm).toBeCalled();
  });

  it ('renders form not found', async ()=> {
    const props = {
      formName: 'testForm',
      loadingForm: false,
      processKey: 'processKey',
      form : null
    };

    const fetchForm = jest.fn();
    const resetForm = jest.fn();
    const fetchFormWithContext = jest.fn();
    const wrapper = await mount(
      <StartForm store={store} {...props}
                 fetchForm={fetchForm}
                 resetForm={resetForm}
                 fetchFormWithContext={fetchFormWithContext}
      />
    );
    console.log(wrapper.debug());
    expect(fetchForm).toBeCalled();
    expect(wrapper.html()).toEqual('<div><!-- react-text: 2 -->Form<!-- /react-text --><!-- react-text: 3 --> with identifier <!-- /react-text --><!-- react-text: 4 -->testForm<!-- /react-text --><!-- react-text: 5 --> was not found<!-- /react-text --></div>');
    wrapper.unmount();
    expect(resetForm).toBeCalled();
  })
});
