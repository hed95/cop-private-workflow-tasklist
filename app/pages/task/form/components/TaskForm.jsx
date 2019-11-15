import React from 'react';
import { Form } from 'react-formio';
import AppConstants from '../../../../common/AppConstants';
import PubSub from 'pubsub-js';
import {Details} from 'govuk-frontend';

export default class TaskForm extends React.Component {

  constructor(props) {
    super(props);
  }


  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return false;
  }

  handleCancel = (resetForm) => {
    this.props.history.replace(AppConstants.DASHBOARD_PATH);
    resetForm(false);
  };

  options = {
    noAlerts: true,
    hooks: {
      beforeCancel: (...args) => {
        this.handleCancel(args);
      }
    },
    i18n: {
      en: {
        submit: 'Submit',
      }
    },
  };

  render() {
    const { onCustomEvent, variables, task, onSubmitTaskForm, formReference, form } = this.props;
    const formVariableSubmissionName = `${form.name}::submissionData`;
    let submissionData = {};

    if (variables['submissionData']) {
      submissionData = variables['submissionData']
    } else if (variables[formVariableSubmissionName]) {
      submissionData = variables[formVariableSubmissionName];
    }

    const variableInput = form.components.find(c => c.key === 'submitVariableName');
    const variableName = variableInput ? variableInput.defaultValue : form.name;


    if (!task.get('assignee')) {
      this.options.readOnly = true;
    }
    return <Form form={form} options={this.options}
                 ref={form => {
                   this.form = form;
                   formReference(form);
                   if (this.form) {
                     this.form.createPromise.then(() => {
                       this.form.formio.on('render', () => {
                         const details = document.querySelectorAll('[data-module="govuk-details"]');
                         details.forEach(  (detail) => {
                           new Details(detail).init();
                         });
                       });
                       this.form.formio.on('error', errors => {
                         PubSub.publish('formSubmissionError', {
                           errors: errors,
                           form: this.form
                         });
                         window.scrollTo(0, 0);
                       });
                       this.form.formio.on('submit', () => {
                         PubSub.publish('formSubmissionSuccessful');
                       });
                       this.form.formio.on('change', (value) => {
                         PubSub.publish('formChange', value);
                       });
                       this.form.formio.on('prevPage', () => {
                         PubSub.publish('clear');
                       });

                       this.form.formio.on('componentError', (error) => {
                         const path = this.props.history.location.pathname;
                         const user = this.props.kc.tokenParsed.email;
                         this.props.log([{
                           user: user,
                           path: path,
                           level: 'error',
                           form: {
                             name: form.name,
                             path: form.path,
                             display: form.display
                           },
                           message: error.message,
                           component: {
                             label: error.component.label,
                             key: error.component.key
                           }
                         }]);
                       });
                     });
                   }
                 }
                 }
                 onCustomEvent={(event) => onCustomEvent(event, variableName)}
                 submission={JSON.parse(submissionData)} onSubmit={(submission) => {
                onSubmitTaskForm(submission.data, variableName);
    }}/>;
  }

  componentWillUnmount() {
    this.observer.destroy();
  }
}
