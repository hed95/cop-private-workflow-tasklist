import { mount } from 'enzyme/build';
import {ProcessStartPage} from './ProcedureStartPage';
import React from 'react';
import Immutable from 'immutable';

const form = {
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
};

describe('Start a procedure page', () => {

  it('renders loading bar if form is loading', async() => {
    const props = {
      loadingForm: true,
      submittingToWorkflow: false,
      submissionToWorkflowSuccessful: false,
      isFetchingProcessDefinition: false,
      match : {
        params: {
          "processKey": "processKey"
        }
      }
    };
    const fetchProcessDefinition = jest.fn();
    const clearProcessDefinition = jest.fn();

    const wrapper = await mount(<ProcessStartPage
      {...props}
      clearProcessDefinition={clearProcessDefinition}
      fetchProcessDefinition={fetchProcessDefinition}
    />);

    expect(fetchProcessDefinition).toHaveBeenCalled();
    expect(wrapper.find('#dataSpinner').exists()).toEqual(true);
    expect(wrapper.find('.loader-message').text()).toEqual('Loading procedure...');

  });

  it ('displays resource not found if form is missing', async() => {
    const props = {
      loadingForm: false,
      submittingToWorkflow: false,
      submissionToWorkflowSuccessful: false,
      isFetchingProcessDefinition: false,
      form: null,
      processDefinition: Immutable.fromJS({
          "formKey" : "formKey"
      }),
      match : {
        params: {
          "processKey": "processKey"
        }
      }
    };
    const fetchProcessDefinition = jest.fn();
    const clearProcessDefinition = jest.fn();

    const wrapper = await mount(<ProcessStartPage
      {...props}
      clearProcessDefinition={clearProcessDefinition}
      fetchProcessDefinition={fetchProcessDefinition}
    />);
    expect(fetchProcessDefinition).toHaveBeenCalled();

    expect(wrapper.find('div').text()).toEqual('Form with identifier formKey was not found')
  });
  it ('fetches form after loading process definition', async() => {
    const props = {
      loadingForm: true,
      submittingToWorkflow: false,
      submissionToWorkflowSuccessful: false,
      isFetchingProcessDefinition: true,
      form: null,
      processDefinition: Immutable.fromJS({
        "formKey" : "formKey"
      }),
      match : {
        params: {
          "processKey": "processKey"
        }
      }
    };
    const fetchProcessDefinition = jest.fn();
    const clearProcessDefinition = jest.fn();
    const fetchForm = jest.fn();

    const wrapper = await mount(<ProcessStartPage
      {...props}
      clearProcessDefinition={clearProcessDefinition}
      fetchProcessDefinition={fetchProcessDefinition}
      fetchForm={fetchForm}
    />);
    expect(fetchProcessDefinition).toHaveBeenCalled();
    wrapper.setProps({
      isFetchingProcessDefinition: false
    });
    expect(fetchForm).toHaveBeenCalled();
  });

  it ('renders the form and process definition', async() => {
    const props = {
      loadingForm: false,
      submittingToWorkflow: false,
      submissionToWorkflowSuccessful: false,
      isFetchingProcessDefinition: false,
      form : form,
      processDefinition: Immutable.fromJS({
        "formKey" : "formKey",
        "process-definition" : {
          "name" : "procedure"
        }
      }),
      match : {
        params: {
          "processKey": "processKey"
        }
      }
    };
    const fetchProcessDefinition = jest.fn();
    const clearProcessDefinition = jest.fn();

    const wrapper = await mount(<ProcessStartPage
      {...props}
      clearProcessDefinition={clearProcessDefinition}
      fetchProcessDefinition={fetchProcessDefinition}
    />);
    console.log(wrapper.html());
    expect(fetchProcessDefinition).toHaveBeenCalled();
    expect(wrapper).toMatchSnapshot();
  });

  it('renders Loader if submitted form', async() => {

    const props = {
      loadingForm: false,
      submittingToWorkflow: false,
      submissionToWorkflowSuccessful: false,
      isFetchingProcessDefinition: false,
      form : form,
      processDefinition: Immutable.fromJS({
        "formKey" : "formKey"
      }),
      match : {
        params: {
          "processKey": "processKey"
        }
      }
    };
    const fetchProcessDefinition = jest.fn();
    const clearProcessDefinition = jest.fn();

    const wrapper = await mount(<ProcessStartPage
      {...props}
      clearProcessDefinition={clearProcessDefinition}
      fetchProcessDefinition={fetchProcessDefinition}
    />);
    wrapper.setProps({submittingToWorkflow: true});
    const loaderContent = wrapper.find('.Loader__content');
    expect(loaderContent.exists()).toEqual(true);
    expect(loaderContent.prop('style')).toEqual({opacity: 0});
  });

  it('redirects to tasks after submission', async() => {
    const props = {
      loadingForm: false,
      submittingToWorkflow: true,
      submissionToWorkflowSuccessful: false,
      isFetchingProcessDefinition: false,
      submissionToFormIOSuccessful: true,
      submittingToFormIO: false,
      form : form,
      processDefinition: Immutable.fromJS({
        "formKey" : "formKey"
      }),
      match : {
        params: {
          "processKey": "processKey"
        }
      },
      history: {
        replace: jest.fn()
      }
    };
    const fetchProcessDefinition = jest.fn();
    const clearProcessDefinition = jest.fn();

    const wrapper = await mount(<ProcessStartPage
      {...props}
      clearProcessDefinition={clearProcessDefinition}
      fetchProcessDefinition={fetchProcessDefinition}
    />);

    const emit = jest.fn(args => console.log("Event " + args));
    wrapper.instance().form.formio = {
      emit: emit
    };
    wrapper.setProps({
      submittingToWorkflow: false,
      submissionToWorkflowSuccessful: true,
      submissionToFormIOSuccessful: true,
      submittingToFormIO: false});

    expect(emit).toHaveBeenCalled();
    expect(props.history.replace).toHaveBeenCalled();
    });

  it('does not redirect if there was an error', async() => {
    const props = {
      loadingForm: false,
      submittingToWorkflow: false,
      submissionToWorkflowSuccessful: false,
      isFetchingProcessDefinition: false,
      submissionToFormIOSuccessful: false,
      submittingToFormIO: true,
      form : form,
      processDefinition: Immutable.fromJS({
        "formKey" : "formKey"
      }),
      match : {
        params: {
          "processKey": "processKey"
        }
      },
      history: {
        replace: jest.fn()
      }
    };
    const fetchProcessDefinition = jest.fn();
    const clearProcessDefinition = jest.fn();

    const wrapper = await mount(<ProcessStartPage
      {...props}
      clearProcessDefinition={clearProcessDefinition}
      fetchProcessDefinition={fetchProcessDefinition}
    />);

    const emit = jest.fn(args => console.log("Event " + args));
    const submission = {
      data: {
        "firstNameId" : "firstname",
        "surnameId" : "surname"
      }
    };
    wrapper.instance().form.formio = {
      emit: emit,
      submission: submission
    };
    wrapper.setProps({
      submittingToWorkflow: false,
      submissionToWorkflowSuccessful: false,
      submissionToFormIOSuccessful: false,
      submittingToFormIO: false});

    expect(emit).toBeCalledWith("error");
    expect(emit).toBeCalledWith("change", submission);

    expect(props.history.replace).not.toHaveBeenCalled();

  });

});
