import ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import React from 'react';

// local imports
import Actions from './Actions';
import TaskTitle from './TaskTitle';

const TaskSummaryPage = props => {
  const { candidateGroups, kc, task, variables } = props;

  return (
    <div>
      <TaskTitle candidateGroups={candidateGroups} kc={kc} task={task} />
      <div className="govuk-grid-row">
        <div className="govuk-column-two-thirds" style={{ paddingTop: '10px' }}>
          <p>{ task.get('description') }</p>
          <Actions task={task} variables={variables} />
        </div>
      </div>
    </div>
  );
};

TaskSummaryPage.propTypes = {
  candidateGroups: ImmutablePropTypes.list.isRequired,
  task: ImmutablePropTypes.map.isRequired,
  variables: PropTypes.objectOf(PropTypes.object),
};

TaskSummaryPage.defaultProps = {
  variables: {},
};

export default TaskSummaryPage;
