import ReactHyperResponsiveTable from 'react-hyper-responsive-table';
import React from 'react';
import moment from 'moment';
import SortTasks from './SortTasks';
import FilterTaskName from './FilterTaskName';
import * as types from 'react-device-detect';
import _ from 'lodash';

const YourGroupTasks = ({ yourGroupTasks,
                          sortYourGroupTasks,
                          filterTasksByName,
                          goToTask,
                          startAProcedure,
                          handleUnclaim,
                          claimTask,
                          userId}) => {
  const underlinedStyle = { cursor: 'pointer', paddingTop: '10px', textDecoration: 'underline' };

  const groupedTasks = yourGroupTasks && yourGroupTasks.get('tasks') ?_.groupBy(yourGroupTasks.get('tasks').toJS(), (data) => {
    const groupKey = data['process-definition'] ? data['process-definition']['category']
      : 'Other';
    return groupKey;
  }): [];
  const sortByKeys = object => {
    const keys = Object.keys(object);
    const initialSort = _.sortBy(keys);
    const sortedKeys = _.sortBy(initialSort, (key) =>  {
      return key === 'Other'? 1: 0;
    });
    return _.fromPairs(
      _.map(sortedKeys, key => [key, object[key]])
    )
  };
  const sortedData = sortByKeys(groupedTasks);

  const headers = types.isMobile ? {
    name: null,
    action: null
  } : {
    name: null,
    due: null,
    assignee: null,
    action: null
  };

  const dataToDisplay = _.map(sortedData, (value, key) => {
    const data = _.map(value, (val) => {
      const task = val.task;
      const claimButton  =  <input id="actionButton" className="btn btn-primary" onClick={() => claimTask(task.id)} type="submit"
                                   value="Claim"/>;
      const unclaimButton = <input id="actionButton" className="btn btn-primary" onClick={() => {
        handleUnclaim(task.id)
      }} type="submit" value="Unclaim"/>;

      const name = task.name;
      const taskId = task.id;

      const toView= <div style={underlinedStyle} onClick={() => goToTask(taskId)}>{name}</div>;

      return types.isMobile ? {
        id: taskId,
        name: toView,
        action: task.assignee === null || task.assignee !== userId ? claimButton : unclaimButton
      } : {
        id: taskId,
        name: toView,
        due: "due " + moment().to(moment(task.due)),
        assignee: task.assignee === null ? 'Unassigned' : (task.assignee === userId ? 'Assigned to you' : task.assignee),
        action: task.assignee === null || task.assignee !== userId ? claimButton : unclaimButton
      }
    });
    return <div key={`category::${key}`} className="tasksGrouping">
      <div className="data-item bold-small" key={key}>{key} ({value.length} {value.length === 1 ? 'task' : 'tasks'})</div>
      <ReactHyperResponsiveTable
        key={`category::${key}`}
        headers={headers}
        rows={data}
        keyGetter={row => row.id}
        breakpoint={578}
        tableStyling={({ narrow }) => (narrow ? 'narrowtable-yourgrouptasks' : 'widetable-yourgrouptasks')}
      />
    </div>
  });
  return <div>
    <div style={underlinedStyle} onClick={startAProcedure}>Start a procedure</div>
    <div style={{ paddingTop: '20px' }}>
      <div className="data" id="yourGroupTasksTotalCount">
          <span
            className="data-item bold-medium">{yourGroupTasks.get('total')} {yourGroupTasks.get('total') === 1 ? 'task' : 'tasks'} allocated to your team</span>
      </div>
      <div className="grid-row">
        <div className="column-one-half">
          <SortTasks tasks={yourGroupTasks} sortTasks={sortYourGroupTasks}/>
        </div>

        <div className="column-one-half">
          <FilterTaskName tasks={yourGroupTasks} filterTasksByName={filterTasksByName}/>
        </div>
      </div>
      {dataToDisplay}

    </div>
  </div>;
};

export default YourGroupTasks;
