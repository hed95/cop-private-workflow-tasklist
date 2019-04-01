import React from 'react';
import { Form } from 'react-formio';

export default class TaskForm extends React.Component {

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return false;
  }

  render() {
    const {onCustomEvent, variables, task, onSubmitTaskForm, formReference, form} = this.props;
    const formVariableSubmissionName = `${form.name}::submissionData`;
    const submissionData = variables['submissionData'] ? variables['submissionData'] : (variables[formVariableSubmissionName]
      ? variables[formVariableSubmissionName] : null);

    const variableInput = form.components.find(c => c.key === 'submitVariableName');
    const variableName = variableInput ? variableInput.defaultValue : form.name;

    const options = {
      noAlerts: true
    };

    if (!task.get('assignee')) {
      options.readOnly = true;
    }
    if (submissionData) {
      return <Form form={form} options={options} ref={(form) => formReference(form)}
                   onCustomEvent={(event) => onCustomEvent(event, variableName)}
                   submission={JSON.parse(submissionData)} onSubmit={(submission) => {
                     onSubmitTaskForm(submission.data, variableName);
                   }}/>;
    } else {
      return <Form form={form} ref={(form) => formReference(form)} options={options}
                   onCustomEvent={(event) => onCustomEvent(event, variableName)}
                   onSubmit={(submission) => {
                     onSubmitTaskForm(submission.data, variableName);
                   }}/>;
    }

  }
}
