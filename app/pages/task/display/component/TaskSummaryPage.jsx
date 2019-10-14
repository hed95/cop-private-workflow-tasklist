import React from 'react';

// local imports
import Actions from './Actions';
import TaskTitle from './TaskTitle';

const TaskSummaryPage = props => {
  const { task, variables } = props;

  return (
    <div>
      <TaskTitle {...props} />
      <div className="govuk-grid-row">
        <div className="govuk-column-two-thirds" style={{ paddingTop: '10px' }}>
          <p>{ task.get('description') }</p>
          <Actions task={task} variables={variables} />
        </div>
      </div>
    </div>
  );
};

export default TaskSummaryPage;
