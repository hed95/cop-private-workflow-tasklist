import React from 'react';
import PropTypes from 'prop-types';
import {
  form, loadingTaskForm, submittingTaskFormForCompletion,
  taskFormCompleteSuccessful, submissionToFormIOSuccessful, submittingToFormIO
} from '../selectors';
import { bindActionCreators } from 'redux';
import * as taskFormActions from '../actions';
import * as taskActions from '../../../pages/task/actions';

import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Form } from 'react-formio';
import { createStructuredSelector } from 'reselect';
import Spinner from 'react-spinkit';
import { unclaimSuccessful } from '../../../pages/task/selectors';
import AppConstants from '../../../common/AppConstants';
import { DataSpinner } from '../../components/DataSpinner';

class TaskForm extends React.Component {

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
          || (!nextProps.submittingTaskFormForCompletion && !nextProps.taskFormCompleteSuccessful)) {
          this.form.formio.emit('error');
          this.form.formio.emit('change', this.form.formio.submission);
        }
      }
    }
    if (nextProps.unclaimSuccessful) {
      this.props.history.push(AppConstants.DASHBOARD_PATH);
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
      return <div>Loading form for {task.get('name')} </div>;
    } else {
      const options = {
        noAlerts: true
      };

      if (!task.get('assignee')) {
        options.readOnly = true;
      }

      const onCustomEvent = (event) => {
        if (event.type === 'unclaim') {
          this.props.unclaimTask(task.get('id'));
        }
        if (event.type === 'cancel') {
          this.props.history.replace(AppConstants.YOUR_GROUP_TASKS_PATH);
        }
      };

      if (form) {
        const formVariableSubmissionName = `${form.name}::submissionData`;
        const submissionData = variables['submissionData'] ? variables['submissionData'] : (variables[formVariableSubmissionName] ? variables[formVariableSubmissionName] : null);
        const variableInput = form.components.find(c => c.key === 'submitVariableName');
        const variableName = variableInput ? variableInput.defaultValue : form.name;

        if (submissionData) {
          return <Form form={form} options={options} ref={(form) => this.form = form}
                       onCustomEvent={(event) => onCustomEvent(event)}
                       submission={JSON.parse(submissionData)} onSubmit={(submission) => {
            this.props.submitTaskForm(form._id, task.get('id'), submission.data, variableName);

          }}/>;
        } else {
          return <Form form={form} ref={(form) => this.form = form} options={options}
                       onCustomEvent={(event) => onCustomEvent(event)}
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
    const { submittingTaskFormForCompletion } = this.props;
    return <div>
      {submittingTaskFormForCompletion ?
        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '5px' }}><DataSpinner
          message="Completing task" /></div> : <div/>
      }
      <div>{this.renderForm()}</div>
    </div>;
  }
}

TaskForm.propTypes = {
  submitTaskForm: PropTypes.func.isRequired,
  fetchTaskForm: PropTypes.func.isRequired,
  unclaimTask: PropTypes.func.isRequired,
  resetForm: PropTypes.func.isRequired,
  loadingTaskForm: PropTypes.bool,
  submittingToFormIO: PropTypes.bool,
  submissionToFormIOSuccessful: PropTypes.bool

};


const mapStateToProps = createStructuredSelector({
  form: form,
  loadingTaskForm: loadingTaskForm,
  submittingTaskFormForCompletion: submittingTaskFormForCompletion,
  taskFormCompleteSuccessful: taskFormCompleteSuccessful,
  unclaimSuccessful: unclaimSuccessful,
  submissionToFormIOSuccessful: submissionToFormIOSuccessful,
  submittingToFormIO: submittingToFormIO
});


const mapDispatchToProps = dispatch => bindActionCreators(Object.assign({}, taskFormActions, taskActions), dispatch);


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TaskForm));
