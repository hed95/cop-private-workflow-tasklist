import React from 'react';
import Actions from './Actions';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import TaskTitle from './TaskTitle';
import Comments from './Comments';
import CompleteTaskForm from '../../form/components/CompleteTaskForm';
import 'flatpickr/dist/flatpickr.min.css';
import flatpickr from 'flatpickr';
import moment from 'moment';
import * as actions from '../actions';
import PropTypes from 'prop-types';
import { customEventSubmissionStatus, submissionStatus } from '../../form/selectors';
import { SUBMITTING } from '../../form/constants';
import DataSpinner from '../../../../core/components/DataSpinner';
import Loader from 'react-loader-advanced';

export class TaskDetailsPage extends React.Component {

  componentDidMount() {
    const { updateDueDate } = this.refs;
    flatpickr(updateDueDate, {
      enableTime: true,
      dateFormat: 'd-m-Y H:i',
      minDate: 'today',
      time_24hr: true,
      onClose: (selectedDates, dateStr, instance) => {
        const { task } = this.props;
        this.props.updateDueDate({ taskId: task.get('id'), dueDate: dateStr });
      }
    });
  }

  render() {
    const { task, variables, submissionStatus } = this.props;
    const showSubmittingLoader = submissionStatus === SUBMITTING || customEventSubmissionStatus === SUBMITTING;

    const hasFormKey = task && task.get('formKey');
    return <div><Loader
      show={showSubmittingLoader}
      message={<div style={{
        justifyContent: 'center',
        zIndex: 100,
        borderRadius: 0,
        position: 'absolute',
        left: 0,
        right: 0,
        top: '-20px',
        margin: 'auto'
      }}><DataSpinner message={`Completing '${task.get('name')}'`}/></div>}
      hideContentOnLoad={showSubmittingLoader}
      foregroundStyle={{ color: 'black' }}
      backgroundStyle={{ backgroundColor: 'white' }}>
      <TaskTitle {...this.props} />
      <div className="grid-row">
        <div className="column-two-thirds" style={{ paddingTop: '10px' }}>
          <p id="taskDescription">{task.get('description')}</p>
          {hasFormKey ? <CompleteTaskForm task={task} variables={variables}/> :
            <Actions task={task} variables={variables}/>}
        </div>
        <div className="column-one-third" style={{ paddingTop: '10px' }}>
          <div className="form-group">
            <label className="form-label" htmlFor="updateDueDate">Change due date:</label>
            <div className="input-group">
              <input className="form-control" ref="updateDueDate" id="updateDueDate" type="text"
                     name="updateDueDate"
                     defaultValue={moment(task.get('due'))
                       .format('DD-MM-YYYY HH:mm')}/>
              <span className="input-group-addon"><span
                className="glyphicon glyphicon-calendar"/></span>
            </div>
          </div>
          <Comments taskId={task.get('id')} {...this.props} />
        </div>
      </div>
    </Loader>
    </div>;
  }
}


TaskDetailsPage.propTypes = {
  updateDueDate: PropTypes.func.isRequired,
  submissionStatus: PropTypes.string,
  customEventSubmissionStatus: PropTypes.string,
};

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default withRouter(connect((state) => {
  return {
    kc: state.keycloak,
    submissionStatus: submissionStatus(state),
    customEventSubmissionStatus: customEventSubmissionStatus(state)
  };
}, mapDispatchToProps)(TaskDetailsPage));
