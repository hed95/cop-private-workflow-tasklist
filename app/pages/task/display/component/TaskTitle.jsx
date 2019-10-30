import ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import React from 'react';
import moment from 'moment';

// local imports
import { priority } from '../../../../core/util/priority';

const TaskTitle = props => {
  const { kc, task } = props;
  const taskPriority = priority(task.get('priority'));
  // datetime format
  const utcDateTime = moment.utc(task.get('due')).format();
  const localDateTime = moment(utcDateTime).local().format();
  const dueDateTime = moment().to(localDateTime);
  let assignee = 'You are the current assignee';

  if (!task.get('assignee')) {
    assignee = 'Unassigned';
  } else if (task.get('assignee') && task.get('assignee') !== kc.tokenParsed.email) {
    assignee = kc.tokenParsed.email;
  }

  return (
    <div>
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-full" id="taskName">
          <h1 className="govuk-heading-m" style={{ width: '100%' }}>{task.get('name')}</h1>
        </div>
      </div>
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-one-third" id="taskDueDate">
          <span className="govuk-caption-m govuk-!-font-size-19">Due</span>
          <h4 className="govuk-heading-m govuk-!-font-size-19">{dueDateTime}</h4>
        </div>
        <div className="govuk-grid-column-one-third" id="taskPriority">
          <span className="govuk-caption-m govuk-!-font-size-19">Priority</span>
          <h4 className="govuk-heading-m govuk-!-font-size-19">{taskPriority}</h4>
        </div>
      </div>
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-one-third" id="taskAssignee">
          <span className="govuk-caption-m govuk-!-font-size-19">Assignee</span>
          <h4 className="govuk-heading-m govuk-!-font-size-19">{assignee}</h4>
        </div>
      </div>
    </div>
  );
};

TaskTitle.propTypes = {
  kc: PropTypes.shape({
    tokenParsed: PropTypes.shape({
      email: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  task: ImmutablePropTypes.map.isRequired,
};

export default TaskTitle;
