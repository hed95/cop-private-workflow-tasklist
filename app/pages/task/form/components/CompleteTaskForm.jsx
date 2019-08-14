import React from 'react';
import PropTypes from 'prop-types';
import { customEventSubmissionStatus, form, loadingTaskForm, submissionStatus } from '../selectors';
import { bindActionCreators } from 'redux';
import * as taskFormActions from '../actions';
import * as taskActions from '../../display/actions';
import {Formio} from 'react-formio';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import AppConstants from '../../../../common/AppConstants';
import NotFound from '../../../../core/components/NotFound';
import { FAILED, SUBMISSION_SUCCESSFUL, SUBMITTING } from '../constants';
import TaskForm from './TaskForm';
import withLog from '../../../../core/error/component/withLog';
import DataSpinner from '../../../../core/components/DataSpinner';
import { unclaimSuccessful } from '../../display/selectors';

export class CompleteTaskForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleCustomEvent = this.handleCustomEvent.bind(this);
    this.handleSubmission = this.handleSubmission.bind(this);
  }

  componentDidMount() {
    this.props.fetchTaskForm(this.props.task);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { submissionStatus, customEventSubmissionStatus} = this.props;
    if (this.form && this.form.formio) {
      if (submissionStatus !== prevProps.submissionStatus) {
        this.handleSubmission(submissionStatus);
      }
      if (customEventSubmissionStatus !== prevProps.customEventSubmissionStatus
          && customEventSubmissionStatus === SUBMISSION_SUCCESSFUL) {
        this.props.history.replace(AppConstants.YOUR_TASKS_PATH);
      }
      if (this.props.unclaimSuccessful) {
        this.props.history.push(AppConstants.YOUR_TASKS_PATH);
      }
    }
  }

  handleSubmission(submissionStatus) {
    const taskName = this.props.task.get('name');
    const path = this.props.history.location.pathname;
    const user = this.props.kc.tokenParsed.email;
    switch (submissionStatus) {
      case SUBMITTING :
        this.props.log([{
          user: user,
          path: path,
          level: 'info',
          message: `Submitting data for ${taskName}`
        }]);
        break;
      case SUBMISSION_SUCCESSFUL:
        this.form.formio.emit('submitDone');
        this.props.log([{
          user: user,
          path: path,
          level: 'info',
          message: `${taskName} successfully completed`
        }]);
        Formio.clearCache();
        if (this.props.redirectPath) {
          this.props.history.replace(this.props.redirectPath);
        } else {
          this.props.history.replace(AppConstants.YOUR_TASKS_PATH);
        }
        break;
      case FAILED :
        this.props.log([{
          user: user,
          path: path,
          level: 'error',
          message: `Failed to complete ${taskName}`
        }]);
        this.form.formio.emit('error');
        this.form.formio.emit('change', this.form.formio.submission);
        break;
      default:
        this.props.log([{
          level: 'warn',
          path: path,
          user: user,
          message: 'Unknown submission status',
          submissionStatus: submissionStatus
        }]);
    }
  }

  handleCustomEvent = (event, variableName) => {
    const { task } = this.props;
    if (event.type === 'unclaim') {
      this.props.unclaimTask(task.get('id'));
    } else if (event.type === 'cancel') {
      this.props.history.replace(AppConstants.YOUR_TASKS_PATH);
    } else {
      this.props.customEvent(event, task, variableName);
    }
  };

  componentWillUnmount() {
    this.form = null;
    this.props.resetForm();
  }


  render() {
    const { loadingTaskForm, form, task} = this.props;
    if (loadingTaskForm) {
      return <DataSpinner message="Loading form for task..."/>;
    }
    if (!form) {
      return <NotFound resource="Form" id={task.get('name')}/>;
    }
    return <TaskForm {...this.props}
                onSubmitTaskForm={(submissionData, variableName) => {
                  this.props.submitTaskForm(form._id, task.get('id'),
                    submissionData, variableName);
                }}
                onCustomEvent={(event) => this.handleCustomEvent(event)}
                formReference={(form) => this.form = form}/>
  }
}

CompleteTaskForm.propTypes = {
  submitTaskForm: PropTypes.func.isRequired,
  customEvent: PropTypes.func.isRequired,
  fetchTaskForm: PropTypes.func.isRequired,
  unclaimTask: PropTypes.func.isRequired,
  resetForm: PropTypes.func.isRequired,
  loadingTaskForm: PropTypes.bool,
  submissionStatus: PropTypes.string,
  customEventSubmissionStatus: PropTypes.string,
};


const mapDispatchToProps = dispatch => bindActionCreators(Object.assign({}, taskFormActions, taskActions), dispatch);


export default withRouter(connect((state) => {
  return {
    form: form(state),
    loadingTaskForm: loadingTaskForm(state),
    unclaimSuccessful: unclaimSuccessful(state),
    submissionStatus: submissionStatus(state),
    customEventSubmissionStatus: customEventSubmissionStatus(state),
    kc: state.keycloak
  };
}, mapDispatchToProps)(withLog(CompleteTaskForm)));
