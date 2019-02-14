import React from 'react';
import PropTypes from 'prop-types';
import {
  form,
  loadingTaskForm,
  submittingTaskFormForCompletion,
  taskFormCompleteSuccessful,
  submissionToFormIOSuccessful,
  submittingToFormIO,
  customEventSuccessfullyExecuted, submittingCustomEvent
} from '../selectors';
import { bindActionCreators } from 'redux';
import * as taskFormActions from '../actions';
import * as taskActions from '../../../pages/task/actions';

import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Form } from 'react-formio';
import { createStructuredSelector } from 'reselect';
import { unclaimSuccessful } from '../../../pages/task/selectors';
import AppConstants from '../../../common/AppConstants';

export class TaskForm extends React.Component {

  componentDidMount() {
    this.props.fetchTaskForm(this.props.task);
  }


  componentWillReceiveProps(nextProps) {
    if (this.form && this.form.formio) {
      if (!nextProps.submittingTaskFormForCompletion && nextProps.taskFormCompleteSuccessful) {
        this.form.formio.emit('submitDone');
        this.props.history.replace(AppConstants.YOUR_TASKS_PATH);
      } else {
        if ((!nextProps.submittingToFormIO && !nextProps.submissionToFormIOSuccessful)
          || (!nextProps.submittingTaskFormForCompletion && !nextProps.taskFormCompleteSuccessful)
          || (!nextProps.submittingCustomEvent && !nextProps.customEventSuccessfullyExecuted)) {
          this.form.formio.emit('error');
          this.form.formio.emit('change', this.form.formio.submission);
        }
      }
    }
    if (nextProps.unclaimSuccessful) {
      this.props.history.push(AppConstants.YOUR_TASKS_PATH);
    }
    if (nextProps.customEventSuccessfullyExecuted) {
      this.props.history.replace(AppConstants.YOUR_TASKS_PATH);
    }
  }

  shouldComponentUpdate() {
    return !this.form;
  }

  componentWillUnmount() {
    this.form = null;
    this.props.resetForm();
  }

  renderForm() {
    const { loadingTaskForm, form, task, variables } = this.props;
    if (loadingTaskForm) {
      return <div id="loadingForm">Loading form for {task.get('name')}</div>;
    } else {
      const options = {
        noAlerts: true
      };

      if (!task.get('assignee')) {
        options.readOnly = true;
      }

      const onCustomEvent = (event, variableName) => {
        if (event.type === 'unclaim') {
          this.props.unclaimTask(task.get('id'));
        } else if (event.type === 'cancel') {
          this.props.history.replace(AppConstants.YOUR_TASKS_PATH);
        } else {
          this.props.customEvent(event, task, variableName);
        }
      };

      if (form) {
        const formVariableSubmissionName = `${form.name}::submissionData`;
        const submissionData = variables['submissionData'] ? variables['submissionData'] :
          (variables[formVariableSubmissionName] ? variables[formVariableSubmissionName] : null);
        const variableInput = form.components.find(c => c.key === 'submitVariableName');
        const variableName = variableInput ? variableInput.defaultValue : form.name;

        if (submissionData) {
          return <Form form={form} options={options} ref={(form) => this.form = form}
                       onCustomEvent={(event) => onCustomEvent(event, variableName)}
                       submission={JSON.parse(submissionData)} onSubmit={(submission) => {
            this.props.submitTaskForm(form._id, task.get('id'), submission.data, variableName);

          }}/>;
        } else {
          return <Form form={form} ref={(form) => this.form = form} options={options}
                       onCustomEvent={(event) => onCustomEvent(event, variableName)}
                       onSubmit={(submission) => {
                         this.props.submitTaskForm(form._id, task.get('id'), submission.data, variableName);
                       }}/>;
        }

      } else {
        return <div/>;
      }

    }
  }

  render() {
    return <div>
      {this.renderForm()}
    </div>;
  }
}

TaskForm.propTypes = {
  submitTaskForm: PropTypes.func.isRequired,
  customEvent: PropTypes.func.isRequired,
  fetchTaskForm: PropTypes.func.isRequired,
  unclaimTask: PropTypes.func.isRequired,
  resetForm: PropTypes.func.isRequired,
  loadingTaskForm: PropTypes.bool,
  submittingToFormIO: PropTypes.bool,
  submissionToFormIOSuccessful: PropTypes.bool,
  customEventSuccessfullyExecuted: PropTypes.bool,
  submittingCustomEvent: PropTypes.bool
};


const mapStateToProps = createStructuredSelector({
  form: form,
  loadingTaskForm: loadingTaskForm,
  submittingTaskFormForCompletion: submittingTaskFormForCompletion,
  taskFormCompleteSuccessful: taskFormCompleteSuccessful,
  unclaimSuccessful: unclaimSuccessful,
  submissionToFormIOSuccessful: submissionToFormIOSuccessful,
  submittingToFormIO: submittingToFormIO,
  customEventSuccessfullyExecuted: customEventSuccessfullyExecuted,
  submittingCustomEvent: submittingCustomEvent
});


const mapDispatchToProps = dispatch => bindActionCreators(Object.assign({}, taskFormActions, taskActions), dispatch);


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TaskForm));
